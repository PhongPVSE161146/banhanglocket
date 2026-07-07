import aiohttp
import asyncio
import datetime


async def create_profile(api_key, log_callback=None, plan_type="year"):
    def log(msg):
        if log_callback:
            log_callback(msg)

    if not api_key:
        log("[!] Chưa cấu hình NextDNS key cho gói này")
        return None, None

    headers = {
        "X-Api-Key": api_key,
        "Content-Type": "application/json",
    }

    label = "THANG" if plan_type == "month" else "NAM"
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")
    profile_name = f"LocketVIP-{label}-{today_str}"

    log(f"[*] Checking for existing profile: {profile_name}...")

    async with aiohttp.ClientSession(headers=headers) as session:
        try:
            list_url = "https://api.nextdns.io/profiles"
            async with session.get(list_url) as res:
                if res.status == 200:
                    data = await res.json()
                    profiles = data.get("data", [])
                    for p in profiles:
                        if p.get("name") == profile_name:
                            pid = p.get("id")
                            log(f"[+] Found existing profile: {pid} (REUSING)")
                            denylist_url = f"https://api.nextdns.io/profiles/{pid}/denylist"
                            try:
                                async with session.post(
                                    denylist_url, json={"id": "revenuecat.com", "active": True}
                                ):
                                    pass
                            except Exception:
                                pass
                            return pid, f"https://apple.nextdns.io/?profile={pid}"
        except Exception as exc:
            log(f"[!] Error listing profiles: {exc}")

        log(f"[*] Creating new profile: {profile_name}")
        create_url = "https://api.nextdns.io/profiles"
        payload = {"name": profile_name}

        try:
            async with session.post(create_url, json=payload) as response:
                if response.status == 200:
                    data = await response.json()
                    pid = data["data"]["id"]
                    log(f"[+] Profile created: {pid}")

                    denylist_url = f"https://api.nextdns.io/profiles/{pid}/denylist"
                    target_domain = "revenuecat.com"
                    try:
                        async with session.post(
                            denylist_url, json={"id": target_domain, "active": True}
                        ):
                            pass
                        async with session.get(denylist_url) as verify_r:
                            if verify_r.status == 200:
                                verify_data = await verify_r.json()
                                rules = verify_data.get("data", [])
                                blocked = [d.get("id") for d in rules if d.get("active")]
                                if target_domain not in blocked:
                                    async with session.post(
                                        denylist_url,
                                        json={"id": "api.revenuecat.com", "active": True},
                                    ):
                                        pass
                    except Exception as block_e:
                        log(f"[!] Error blocking domain: {block_e}")

                    return pid, f"https://apple.nextdns.io/?profile={pid}"

                text = await response.text()
                log(f"NextDNS Error: {response.status} {text}")
                return None, None
        except Exception as exc:
            log(f"Error creating NextDNS profile: {exc}")
            return None, None

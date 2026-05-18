import { useCallback, useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import MusicOffOutlinedIcon from '@mui/icons-material/MusicOffOutlined'
import { BACKGROUND_MUSIC } from '../../constants/siteData'

const STORAGE_KEY = 'locket-gold-music-on'

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = BACKGROUND_MUSIC.volume

    const onCanPlay = () => setReady(true)
    const onError = () => setMissing(true)
    const onEnded = () => {
      audio.currentTime = 0
      audio.play().catch(() => setPlaying(false))
    }

    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || missing) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      localStorage.setItem(STORAGE_KEY, '0')
      return
    }

    if (!ready) {
      audio.load()
    }

    try {
      await audio.play()
      setPlaying(true)
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      setPlaying(false)
    }
  }, [playing, ready, missing])

  return (
    <>
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC.src}
        loop
        preload="none"
        playsInline
      />

      <div className="music-player-fab">
        <Tooltip
          title={
            missing
              ? `Thêm file MP3 vào public/audio/ (xem README)`
              : playing
                ? `Tắt nhạc — ${BACKGROUND_MUSIC.title}`
                : `Bật nhạc — ${BACKGROUND_MUSIC.title} (${BACKGROUND_MUSIC.artist})`
          }
        >
          <span>
            <IconButton
              onClick={toggle}
              disabled={missing}
              className={`music-fab-btn${playing ? ' playing' : ''}`}
              aria-label={playing ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
              size="large"
            >
              {playing ? (
                <MusicNoteOutlinedIcon />
              ) : (
                <MusicOffOutlinedIcon />
              )}
            </IconButton>
          </span>
        </Tooltip>
        {playing && (
          <span className="music-fab-label">
            <span className="music-pulse" />
            {BACKGROUND_MUSIC.artist}
          </span>
        )}
      </div>
    </>
  )
}

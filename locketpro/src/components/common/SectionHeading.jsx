import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function SectionHeading({ title, subtitle, mb = 5 }) {
  return (
    <Box className="section-heading-center" sx={{ textAlign: 'center', mb: subtitle ? 1 : mb }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.5rem', md: '2rem' },
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            color: '#6b7280',
            mt: 1.5,
            mb,
            maxWidth: 520,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}

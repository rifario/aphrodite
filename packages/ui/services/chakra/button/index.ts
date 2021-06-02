export const Button = {
  baseStyle: {
    letterSpacing: '-0.6px',
    borderRadius: '3xl',
    transition: 'all 0.4s cubic-bezier(.67,.15,.26,.88)',
    _hover: {
      transform: 'translateY(-1.5px)',
      transition: 'all 0.2s cubic-bezier(.12,.5,.23,1.01)'
    },
    _active: {
      transform: 'translateY(-0.5px)'
    }
  },
  sizes: {
    sm: {
      fontSize: 'sm'
    }
  },
  variants: {
    outline: {
      border: '2px'
    }
  }
}

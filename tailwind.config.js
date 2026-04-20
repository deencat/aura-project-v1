const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
        aura: {
          pearl: '#FFF9FC',
          blush: '#FFE4EE',
          blush2: '#FFD1E2',
          rose: '#E85A8B',
          roseDeep: '#C63E6E',
          plumInk: '#2A0C18',
          lilacMist: '#F3E9FF',
        },
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
      backgroundImage: {
        'aura-page': 'radial-gradient(1200px circle at 20% 12%, rgba(232, 90, 139, 0.16) 0%, rgba(232, 90, 139, 0) 55%), radial-gradient(900px circle at 82% 18%, rgba(255, 209, 226, 0.65) 0%, rgba(255, 209, 226, 0) 58%), linear-gradient(180deg, #FFF9FC 0%, #FFE4EE 32%, #FFD1E2 100%)',
        'aura-card': 'linear-gradient(180deg, rgba(255,249,252,0.78) 0%, rgba(255,228,238,0.56) 100%)',
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ],
  			serif: [
  				'var(--font-playfair)',
                    ...fontFamily.serif
                ]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
            'ping-slow': {
                '0%': {
                    transform: 'scale(1)',
                    opacity: '1'
                },
                '75%, 100%': {
                    transform: 'scale(2)',
                    opacity: '0'
                }
            }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
            'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} 
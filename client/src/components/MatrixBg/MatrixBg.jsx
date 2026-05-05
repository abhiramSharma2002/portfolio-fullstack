import { useEffect, useRef } from 'react'

const MatrixBg = () => {

  // canvas element ko pakdne ke liye ref
  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')  // 2D drawing mode

    // ── Step 1: Canvas ka size window ke barabar karo ──
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    // ── Step 2: Jo characters screen pe girenge ──
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/={}'

    const fontSize = 14  // har character ka size

    // ── Step 3: Kitne columns honge (horizontal) ──
    const columns = Math.floor(canvas.width / fontSize)

    // ── Step 4: Har column ki starting position ──
    // drops[0] = 1st column ki y position
    // drops[1] = 2nd column ki y position ... aur aage
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    // ── Step 5: Draw function — har 50ms pe chalega ──
    const draw = () => {

      
      ctx.fillStyle = 'rgba(5, 8, 16, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Character ka color aur size set karo
      ctx.fillStyle = '#00ffaa'  // green color
      ctx.font      = `${fontSize}px monospace`

      // Har column ke liye ek character draw karo
      for (let i = 0; i < drops.length; i++) {

        // Random character choose karo
        const char = characters[Math.floor(Math.random() * characters.length)]

        // Character draw karo
        // i * fontSize = horizontal position (x)
        // drops[i] * fontSize = vertical position (y)
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Agar column screen ke bottom pe pahunch gaya
        // toh randomly reset karo upar se
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Column ko ek step neeche le jao
        drops[i]++
      }
    }

    // ── Step 6: Animation start karo ──
    const interval = setInterval(draw, 50)

    // ── Step 7: Window resize hone par canvas resize karo ──
    const handleResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // ── Step 8: Cleanup — component hatne par sab band karo ──
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }

  }, [])  // sirf ek baar run hoga — component mount hone par

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',   // page scroll hone par bhi same jagah rahe
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,         // sabse neeche rahe
        opacity:       0.045,     // bahut halka — sirf background me dike
        pointerEvents: 'none',    // mouse clicks block na kare
      }}
    />
  )
}

export default MatrixBg
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeJSBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create stars for time-space travel effect
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.6
    })

    const starsVertices = []
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 3000
      const y = (Math.random() - 0.5) * 3000
      const z = (Math.random() - 0.5) * 3000
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Create energy particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x666666,
      size: 0.8,
      transparent: true,
      opacity: 0.5
    })

    const particlesVertices = []
    for (let i = 0; i < 8000; i++) {
      const x = (Math.random() - 0.5) * 1500
      const y = (Math.random() - 0.5) * 1500
      const z = Math.random() * 1500 - 750
      particlesVertices.push(x, y, z)
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3))
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Create floating geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(2),
      new THREE.OctahedronGeometry(1.5),
      new THREE.IcosahedronGeometry(1)
    ]

    const shapeMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    })

    const shapes: THREE.Mesh[] = []
    for (let i = 0; i < 50; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const shape = new THREE.Mesh(geometry, shapeMaterial)
      
      shape.position.set(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      )
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      shapes.push(shape)
      scene.add(shape)
    }

    // Position camera
    camera.position.z = 0

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Rotate stars slowly
      stars.rotation.x += 0.0003
      stars.rotation.y += 0.0005

      // Move particles
      const particlePositions = particles.geometry.attributes.position.array as Float32Array
      for (let i = 2; i < particlePositions.length; i += 3) {
        particlePositions[i] += 2.5
        if (particlePositions[i] > 750) {
          particlePositions[i] = -750
        }
      }
      particles.geometry.attributes.position.needsUpdate = true

      // Animate floating shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 + index * 0.0001
        shape.rotation.y += 0.002 + index * 0.0001
        shape.position.z += 1
        if (shape.position.z > 1000) {
          shape.position.z = -1000
        }
      })

      // Subtle camera movement for immersion
      camera.position.x = Math.sin(Date.now() * 0.0003) * 8
      camera.position.y = Math.cos(Date.now() * 0.0002) * 5

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ 
        background: 'radial-gradient(ellipse at center, #111111 0%, #000000 70%)',
        pointerEvents: 'none'
      }}
    />
  )
}
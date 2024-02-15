import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const init = () => {
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	}

	const scene = new THREE.Scene()
	const canvas = document.querySelector('.canvas')
	const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
	scene.add(camera)

	const controls = new OrbitControls(camera, canvas)
    controls.enableZoom = false
	controls.enableRotate = false
    controls.enablePan = false
	controls.maxDistance = 7
    controls.maxPolarAngle = THREE.MathUtils.degToRad( 90 )
    
	const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio( window.devicePixelRatio )

	renderer.setSize(sizes.width, sizes.height)
	renderer.render(scene, camera)
	
	const hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333)
	hemiLight.castShadow = true
    hemiLight.receiveShadow = true
    hemiLight.intensity = 2
    hemiLight.position.set(0, 20, 0)
	scene.add(hemiLight)


	const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.castShadow = true
    dirLight.receiveShadow = true
    dirLight.intensity = 2
    dirLight.position.set( 2, 10, -0.5 )
	scene.add(dirLight)


	return { sizes, scene, canvas, camera, renderer, controls }
}

export default init


import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


import init from './init'
import { getData } from "./API"

import '../assets/styles/style.scss'

import background from '../assets/images/background.png'
import armor from '../assets/images/armor.png'
import gunAndTower from '../assets/images/gun-and-tower.png'
import tracks from '../assets/images/tracks.png'



const MODEL_URL = new URL(
    '../assets/model/t-34-85_3d-model.glb',
    import.meta.url
)

const TERRAIN_URL = new URL('../assets/model/terrain.glb', import.meta.url)

const { sizes, camera, scene, canvas, controls, renderer } = init()

let cursorX = 0,
    cursorY = 0

let inFocus = false

scene.background = new THREE.TextureLoader().load(background)

const loader = new GLTFLoader()
loader.load(MODEL_URL.href, (glft) => {
    scene.add(glft.scene)
    animate()
})

loader.load(TERRAIN_URL.href, (glft) => {
    glft.scene.position.y = -3.2
    scene.add(glft.scene)
})

const gunAndTowerGeometry = new THREE.BoxGeometry(0.6, 0.6, 0)
const gunAndTowerMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(gunAndTower),
    transparent: true,
})
const gunAndTowerIcon = new THREE.Mesh(gunAndTowerGeometry, gunAndTowerMaterial)
gunAndTowerIcon.position.set(0, 1.4, 1.5)
gunAndTowerIcon.name = 'gunAndTower'
scene.add(gunAndTowerIcon)

const armorGeometry = new THREE.BoxGeometry(0.6, 0.6, 0)
const armorMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(armor),
    transparent: true,
})
const armorIcon = new THREE.Mesh(armorGeometry, armorMaterial)
armorIcon.position.set(-1.3, 0.3, 2)
armorIcon.name = 'armor'
scene.add(armorIcon)

const tracksGeometry = new THREE.BoxGeometry(0.6, 0.6, 0)
const tracksMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(tracks),
    transparent: true,
})
const tracksIcon = new THREE.Mesh(tracksGeometry, tracksMaterial)
tracksIcon.position.set(1.4, 0.1, 2.5)
tracksIcon.name = 'tracks'
scene.add(tracksIcon)

const findCursorPosition = (event) => {
    cursorX = event.clientX - window.innerWidth / 2
    cursorY = event.clientY - window.innerHeight / 2
}

renderer.domElement.addEventListener('pointermove', findCursorPosition)

function animate() {
    requestAnimationFrame(animate)
    
    if (!inFocus) {
        camera.position.x += cursorX * 0.00004
        camera.position.y += -cursorY * 0.00004
        camera.position.z = 6.5
        camera.lookAt(scene.position)
        
    }

    controls.update()
    renderer.render(scene, camera)
}

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

function onMouseClick(event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    var isIntersected = raycaster.intersectObjects(scene.children)
    if (isIntersected[0]) {
        switch (isIntersected[0].object.name) {
            case 'armor':
                inFocus = true
                anime({
                    targets: camera.position,
                    x: -2,
                    y: 0.5,
                    z: 5,
                    easing: 'easeInOutQuad',
                })
                getData('armor')
            break
            case 'gunAndTower':
                inFocus = true
                anime({
                    targets: camera.position,
                    x: 0,
                    y: 2,
                    z: 5,
                    easing: 'easeInOutQuad',
                })
                getData('gunAndTower')
            break
            case 'tracks':
                inFocus = true
                anime({
                    targets: camera.position,
                    x: 2.5,
                    y: -0.2,
                    z: 4,
                    easing: 'easeInOutQuad',
                })
                getData('tracks')
            break
            default:
                inFocus && anime({
                    targets: camera.position,
                    x: 0,
                    y: 1,
                    z: 6.5,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        inFocus = false
                    }
                })
                getData()
            break
        }
    }else  {
        inFocus = false
        getData()

    }
}

window.addEventListener('click', onMouseClick)

window.addEventListener('resize', () => {
    // Обновляем размеры
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Обновляем соотношение сторон камеры
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Обновляем renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)
})

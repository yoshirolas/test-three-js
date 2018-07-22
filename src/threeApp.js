import * as THREE from 'three';
import * as OrbitControlsLib from 'three-orbit-controls';
const OrbitControls = OrbitControlsLib(THREE);

const MESH_LIMIT = 70;

const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
};

const mouse = new THREE.Vector2();

const onMouseMove = event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
};
const setMeshColor = (obj, color) => {
    obj.material.color.setHex( color );
};
const createMeshHighlight = (obj, color) => {
    setMeshColor(obj, color);
};
const removeMeshHighlight = (obj, color) => {
    setMeshColor(obj, color);
    obj = null;
    color = null;
};

export const create3dWorld = container => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 
        65, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000 
    );
    camera.position.y = 3;
    camera.position.z = 20;
    const controls = new OrbitControls(camera);
    const raycaster = new THREE.Raycaster();
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    for (let i = 1; i <= MESH_LIMIT; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00, 
            wireframe: true 
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = getRandom(-10, 10);
        cube.position.y = getRandom(-5, 5);
        cube.position.z = getRandom(-7, 3);
        scene.add(cube);
    };

    let catchedMesh = null;
    let catchedMeshColor = null;
    let highlightedMesh = null;
    const highlightColor = 0xFF00FF;

    const animate3dScene = () => {
        controls.update();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            catchedMesh = intersects[0].object;
            if (highlightedMesh && highlightedMesh !== catchedMesh) {
                removeMeshHighlight(highlightedMesh, catchedMeshColor);
            };
            if (catchedMesh) {
                if (!catchedMeshColor) {
                    catchedMeshColor = catchedMesh.material.color.getHex();
                };
                highlightedMesh = catchedMesh;
                createMeshHighlight(highlightedMesh, highlightColor);
            };
        } else if (catchedMeshColor) {
            removeMeshHighlight(highlightedMesh, catchedMeshColor);
        };
        renderer.render(scene, camera);

        requestAnimationFrame(animate3dScene);
    };

    animate3dScene();
    window.addEventListener('mousemove', onMouseMove, false);
};
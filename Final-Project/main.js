// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add background and lighting
scene.background = new THREE.Color(0x87CEEB);
const ambientLight = new THREE.AmbientLight(0x404040, 2); 
scene.add(ambientLight);

// Add a point light for the fish
const pointLight = new THREE.PointLight(0xFFFFFF, 3, 100); 
pointLight.position.set(0, 5, -10); 
scene.add(pointLight);

// Load fish model using GLTFLoader
const loader = new THREE.GLTFLoader();
let fishModel;
loader.load(
    'models/fish.glb', 
    (gltf) => {
        fishModel = gltf.scene;
        fishModel.scale.set(2, 2, 2); // Scale the fish model
        scene.add(fishModel);
        fishModel.position.set(0, 0, -10); 
    },
    undefined, 
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Load seaweed models
const seaweedModels = [];
const seaweedPositions = [
    { x: -5, y: -15, z: -10 },
    { x: 0, y: -15, z: -10 },
    { x: 5, y: -15, z: -10 },
];

seaweedPositions.forEach((position) => {
    loader.load(
        'models/seaweed.glb',
        (gltf) => {
            const seaweed = gltf.scene;
            seaweed.scale.set(3, 3, 3); 
            scene.add(seaweed);
            seaweed.position.set(position.x, position.y, position.z);
            seaweedModels.push(seaweed); 
        },
        undefined,
        (error) => {
            console.error('Error loading seaweed model:', error);
        }
    );
});

// Create bubbles
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFFF,
    transparent: true,
    opacity: 0.6,
});

let bubbles = [];
const numBubbles = 2; 

for (let i = 0; i < numBubbles; i++) {
    const bubble = new THREE.Mesh(sphereGeometry, sphereMaterial);
    bubble.position.set(Math.random() * 10 - 5, -10, -5); 
    scene.add(bubble);
    bubbles.push(bubble);
}

// Move fish with keyboard
let fishSpeed = 0.2; 
let fishDirection = 1; 

window.addEventListener('keydown', (event) => {
    if (fishModel) {
        if (event.key === 'ArrowUp') {
            fishModel.position.y += fishSpeed;
        } else if (event.key === 'ArrowDown') {
            fishModel.position.y -= fishSpeed;
        } else if (event.key === 'ArrowLeft') {
            fishModel.position.x -= fishSpeed;
            fishModel.scale.x = 2; // Flip the fish to face left
        } else if (event.key === 'ArrowRight') {
            fishModel.position.x += fishSpeed;
            fishModel.scale.x = -2; // Flip the fish to face right
        }
    }
});

// Render the scene
const animateMain = function () {
    requestAnimationFrame(animateMain);

    // Move bubbles upwards and reset them after they reach the top
    bubbles.forEach((bubble) => {
        if (bubble.position.y < 5) {
            bubble.position.y += 0.05; // Move the bubble up
        }
        if (bubble.position.y >= 5) {
            bubble.position.y = -10; // Reset the bubble
            bubble.position.x = Math.random() * 10 - 5; 
        }
    });

    // Animate seaweed swaying 
    seaweedModels.forEach((seaweed) => {
        seaweed.position.x += 0.02 * Math.sin(Date.now() * 0.001); 
    });

    // Render the scene
    renderer.render(scene, camera);
};

// Adjust camera on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

camera.position.z = 10;
animateMain(); 

// Initialisierung von Szene, Kamera und Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Boden (Wüste)
const groundGeometry = new THREE.PlaneGeometry(500, 500);
const groundMaterial = new THREE.MeshBasicMaterial({color: 0xf4a460});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Spieler (ein einfaches 3D-Modell als Platzhalter)
const playerGeometry = new THREE.ConeGeometry(1, 2, 32);
const playerMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.rotation.y = Math.PI; // Spieler schaut nach vorne
scene.add(player);

// Waffen (einfach als Text angezeigt)
const weapons = ['P99', 'AK47', 'M16', 'Shotgun', 'Sniper'];
let currentWeapon = 0;

// Gegner
const enemies = [];
for (let i = 0; i < 10; i++) {
    const enemyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const enemyMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    enemy.position.set(Math.random() * 50 - 25, 1, Math.random() * 50 - 25);
    scene.add(enemy);
    enemies.push(enemy);
}

// Mitspieler (auch als einfache Kugeln)
const players = [];
for (let i = 0; i < 9; i++) {
    const teammateGeometry = new THREE.SphereGeometry(1, 32, 32);
    const teammateMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const teammate = new THREE.Mesh(teammateGeometry, teammateMaterial);
    teammate.position.set(Math.random() * 50 - 25, 1, Math.random() * 50 - 25);
    scene.add(teammate);
    players.push(teammate);
}

// Kamera-Position
camera.position.z = 5;
camera.position.y = 1.5;
camera.lookAt(player.position);

// Steuerung
const keys = {};
window.addEventListener('keydown', (event) => keys[event.key] = true);
window.addEventListener('keyup', (event) => keys[event.key] = false);

// Maussteuerung für Waffenwechsel
window.addEventListener('mousedown', (event) => {
    if (event.button === 2) { // Rechte Maustaste
        currentWeapon = (currentWeapon + 1) % weapons.length;
        console.log('Aktuelle Waffe:', weapons[currentWeapon]);
    } else if (event.button === 0) { // Linke Maustaste
        console.log('Schießt mit', weapons[currentWeapon]);
    }
    event.preventDefault();
});

// Animation und Render-Loop
function animate() {
    requestAnimationFrame(animate);

    // Bewegung
    if (keys['ArrowUp']) player.position.z -= 0.1;
    if (keys['ArrowDown']) player.position.z += 0.1;
    if (keys['ArrowLeft']) player.position.x -= 0.1;
    if (keys['ArrowRight']) player.position.x += 0.1;
    if (keys['Enter']) player.position.y += 0.1; // Springen
    if (keys['x']) player.scale.y = 0.5; // Ducken
    if (keys['y']) player.scale.y = 0.2; // Kriechen
    if (keys['m']) console.log('Anvisieren'); // Anvisieren
    if (keys['n']) console.log('Nachladen'); // Nachladen

    renderer.render(scene, camera);
}
animate();

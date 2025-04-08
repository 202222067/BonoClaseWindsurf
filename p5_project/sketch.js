let estado = 0;  // 0: círculo rojo, 1: triángulo amarillo, 2: dos círculos, 3: figuras en esquinas

function setup() {
    createCanvas(800, 600);
}

function draw() {
    switch(estado) {
        case 0:
            // Estado inicial: círculo rojo y rectángulos
            background(220);
            fill(255, 0, 0);
            noStroke();
            circle(mouseX, mouseY, 50);
            
            for (let i = 0; i < 5; i++) {
                fill(random(255), random(255), random(255));
                rect(random(width), random(height), 30, 30);
            }
            break;
            
        case 1:
            // Segundo estado: triángulo amarillo con fondo rosa
            background(255, 192, 203);
            fill(255, 255, 0);
            noStroke();
            triangle(
                mouseX, mouseY - 25,
                mouseX - 25, mouseY + 25,
                mouseX + 25, mouseY + 25
            );
            break;
            
        case 2:
            // Tercer estado: dos círculos con fondo verde
            background(0, 255, 0);
            fill(0);
            noStroke();
            circle(mouseX - 25, mouseY, 30);
            circle(mouseX + 25, mouseY, 30);
            break;
            
        case 3:
            // Cuarto estado: figuras en esquinas con fondo morado
            background(128, 0, 128);  // Fondo morado
            
            // Área superior izquierda - Estrella
            if (mouseX < width/2 && mouseY < height/2) {
                fill(255, 255, 0);  // Amarillo
                drawStar(width/4, height/4, 30, 15, 5);
            }
            
            // Área superior derecha - Círculos concéntricos
            if (mouseX > width/2 && mouseY < height/2) {
                noFill();
                stroke(0, 255, 255);  // Cyan
                for (let i = 0; i < 5; i++) {
                    circle(3*width/4, height/4, 20 + i*15);
                }
            }
            
            // Área inferior izquierda - Flor
            if (mouseX < width/2 && mouseY > height/2) {
                fill(255, 192, 203);  // Rosa
                noStroke();
                drawFlower(width/4, 3*height/4, 30);
            }
            
            // Área inferior derecha - Espiral
            if (mouseX > width/2 && mouseY > height/2) {
                stroke(255);  // Blanco
                noFill();
                drawSpiral(3*width/4, 3*height/4, 30);
            }
            break;
    }
}

function mousePressed() {
    estado = (estado + 1) % 4;  // Cambia entre los cuatro estados
}

// Función para dibujar una estrella
function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle/2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a+halfAngle) * radius1;
        sy = y + sin(a+halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

// Función para dibujar una flor
function drawFlower(x, y, size) {
    for (let angle = 0; angle < TWO_PI; angle += PI/4) {
        push();
        translate(x, y);
        rotate(angle);
        ellipse(0, size/2, size/2, size);
        pop();
    }
    fill(255, 255, 0);  // Centro amarillo
    circle(x, y, size/2);
}

// Función para dibujar una espiral
function drawSpiral(x, y, size) {
    beginShape();
    for (let angle = 0; angle < 6*PI; angle += 0.1) {
        let r = size * (angle/(6*PI));
        let sx = x + r * cos(angle);
        let sy = y + r * sin(angle);
        vertex(sx, sy);
    }
    endShape();
}

/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
    //constructor(gl, vertexShader, fragmentShader) {
    constructor(gl) {
        const vertexShader = `
        in vec4 aPosition;
        in vec3 aColor;
    
        out vec3 vColor;
    
        uniform mat4 P;
        uniform mat4 MV;
    
        void main() {
            gl_Position = P * MV * aPosition;
            vColor = aColor;
        }
    `;

        const fragmentShader = `
        in vec3 vColor;
        out vec4 fColor;
    
        void main() {
            fColor = vec4(vColor, 1.0);
        }
    `;

        const positions = new Float32Array([
            //(-0.5 to 0.5)
            //(12 * (3 * 3) ) = 108 total

            // Front of Cube
            -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,

            // Back of Cube
            -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,

            // Right of Cube
            0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
            0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5,

            // Left of Cube
            -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5,

            // Top of Cube
            -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,

            // Bottom of Cube
            -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
        ]);


        const colors = new Float32Array([
            // Front of cube 
            1.0, 0.0, 0.0,   // Red
            0.0, 1.0, 0.0,   // Green
            0.0, 0.0, 1.0,   // Blue
            1.0, 0.0, 0.0,   // Red
            0.0, 0.0, 1.0,   // Blue
            1.0, 1.0, 0.0,   // Yellow

            // Back of cube
            0.0, 1.0, 1.0,   // Cyan
            1.0, 0.75, 0.8,  // Pink
            1.0, 0.5, 0.0,   // Orange
            0.0, 1.0, 1.0,   // Cyan
            1.0, 0.5, 0.0,   // Orange
            0.5, 0.0, 0.5,   // Purple

            // Right of cube
            1.0, 0.0, 0.0,   // Red
            0.0, 1.0, 0.0,   // Green
            0.0, 0.0, 1.0,   // Blue
            1.0, 0.0, 0.0,   // Red
            0.0, 0.0, 1.0,   // Blue
            1.0, 1.0, 0.0,   // Yellow

            // Left of cube
            0.0, 1.0, 1.0,   // Cyan
            1.0, 0.75, 0.8,  // Pink
            1.0, 0.5, 0.0,   // Orange
            0.0, 1.0, 1.0,   // Cyan
            1.0, 0.5, 0.0,   // Orange
            0.5, 0.0, 0.5,   // Purple

            // Top of cube
            1.0, 0.0, 0.0,   // Red
            0.0, 1.0, 0.0,   // Green
            0.0, 0.0, 1.0,   // Blue
            1.0, 0.0, 0.0,   // Red
            0.0, 0.0, 1.0,   // Blue
            1.0, 1.0, 0.0,   // Yellow

            // Bottom of cube
            0.0, 1.0, 1.0,   // Cyan
            1.0, 0.75, 0.8,  // Pink
            1.0, 0.5, 0.0,   // Orange
            0.0, 1.0, 1.0,   // Cyan
            1.0, 0.5, 0.0,   // Orange
            0.5, 0.0, 0.5    // Purple
        ]);

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
        let aColor = new Attribute(gl, program, "aColor", colors, 3, gl.FLOAT);


        this.draw = () => {
            program.use();

            //enable attributes
            aPosition.enable();
            aColor.enable();

            // Draw
            gl.drawArrays(gl.TRIANGLES, 0, 36);

            // Disable attributes
            aPosition.disable();
            aColor.disable();
        }
    };
}

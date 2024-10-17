/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
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
            -0.5, -0.5,  0.5,  // Vertex 0
            0.5, -0.5,  0.5,  // Vertex 1
            0.5,  0.5,  0.5,  // Vertex 2
            -0.5,  0.5,  0.5,  // Vertex 3
            -0.5, -0.5, -0.5,  // Vertex 4
            0.5, -0.5, -0.5,  // Vertex 5
            0.5,  0.5, -0.5,  // Vertex 6
            -0.5,  0.5, -0.5   // Vertex 7
        ]);


        const colors = new Float32Array([
            1.0, 0.0, 0.0,  // Vertex 0
            0.0, 1.0, 0.0,  // Vertex 1
            0.0, 0.0, 1.0,  // Vertex 2
            1.0, 1.0, 0.0,  // Vertex 3
            0.5, 0.0, 0.5,  // Vertex 4
            1.0, 0.5, 0.7,  // Vertex 5
            0.5, 0.5, 0.5,  // Vertex 6
            1.0, 0.5, 0.0   // Vertex 7
        ]);

        //12 triangles (36 total indices)
        const indices = new Uint16Array([
            // Front of cube
            0, 1, 2,
            0, 2, 3,

            // Back of cube
            4, 5, 6,
            4, 6, 7,

            // Right of cube
            1, 5, 6,
            1, 6, 2,

            // Left of cube
            0, 4, 7,
            0, 7, 3,

            // Top of cube
            3, 2, 6,
            3, 6, 7,

            // Bottom of cube
            0, 1, 5,
            0, 5, 4
        ]);

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        // Create attributes
        let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
        let aColor = new Attribute(gl, program, "aColor", colors, 3, gl.FLOAT);

        let indicesBuffer = new Indices(gl, indices);

        this.draw = () => {
            program.use();

            // Enable attributes
            aPosition.enable();
            aColor.enable();

            // Enable indices and draw elements
            indicesBuffer.enable();

            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            // Disable attributes
            aPosition.disable();
            aColor.disable();
            indicesBuffer.disable();
        };
    }
}


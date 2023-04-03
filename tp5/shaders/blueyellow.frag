#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

varying vec4 vPosition;

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

void main() {
    if(vPosition.y < 0.5){
	    gl_FragColor = vec4(0.6,0.6,0.9, 1.0);
    }
    else {
        gl_FragColor = vec4(0.95, 0.89, 0.46, 1.0);
    }
}
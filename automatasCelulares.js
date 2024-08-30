// author: Fernando Acosta

setFunction({
	name: 'life',
	type: 'combine',
	inputs: [

    	{
        	type: 'float',
        	name: 'ancho',
        	default: 0,
    	},
    	{
        	type: 'float',
        	name: 'alto',
        	default: 0,
    	}



	],
	glsl: `   
	vec2 uv2 = gl_FragCoord.xy/resolution.xy;
	float neighbors = 0.0;
    
	for(float i = -1.0; i <= 1.0; i += 1.0)
	{
    	for( float j = -1.0; j <= 1.0; j += 1.0)
    	{
        	vec2 coso = vec2(ancho,alto);
         	vec2 offset = vec2(i, j) / coso;     	// Scale the offset down
    	//vec4 comp = texture2D(tex0, uv2 + vec2(1,1));
     	vec4 lookup = texture2D(tex0, uv2 + offset); // Apply offset and sample
         	neighbors += lookup.x;                         	// Accumulate the result
    	}
	}
    
	/*
    	This samples the pixel/cell in the previous frame. We use this along with the
    	neighbor count to determined whether the cell is alive or dead in this
    	iteration.
    	Note that we have now redundantly sampled this pixel twice (in the double for loop also!).
    	This is just for simplicity. If you wish, you can try to make the code more efficient :)
	*/    
    
	float cell = texture2D(tex0, uv2).x;
    
    

 	if(cell > 0.0) {
     	if(neighbors >= 3.0 && neighbors <= 4.0) {
         	return vec4(1,1,1,1);
     	}
 	} else if(neighbors > 2.0 && neighbors < 4.0) {
     	return vec4(1,1,1,1);
 	} else {return vec4(0,0,0,1);}
    
   `
})

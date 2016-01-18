# Note that the output files are not true JSON. Each file must be manually edited to be a JSON object.


# Small values:
stream = open( "x_1e-200_1e-308.json", "w" );

for i in linspace( 1e-200, 1e-308, 1007 )
    out = frexp( i );
    write( stream, string( "\"", i, "\":[", out[1], ",", out[2], "],\n" ) );
end

close( stream );


# Medium values:
stream = open( "x_-1e3_1e3.json", "w" );

for i in linspace( -1e3, 1e3, 1007 )
    out = frexp( i );
    write( stream, string( "\"", i, "\":[", out[1], ",", out[2], "],\n" ) );
end

close( stream );


# Large values:
stream = open( "x_1e200_1e308.json", "w" );

for i in linspace( 1e200, 1e308, 1007 )
    out = frexp( i );
    write( stream, string( "\"", i, "\":[", out[1], ",", out[2], "],\n" ) );
end

close( stream );


# Subnormal values:
stream = open( "x_1e-310_5e-324.json", "w" );

for i in linspace( 1e-310, 5e-324, 1007 )
    out = frexp( i );
    write( stream, string( "\"", i, "\":[", out[1], ",", out[2], "],\n" ) );
end

close( stream );

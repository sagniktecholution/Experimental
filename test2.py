import os, sys, math


# bad function with bad spacing
def   badFunction   (x,y):
  if x>0:
     if y>0: return x+y
     else:
            return x-y
  elif x==0: return 0 
  else:
    return math.sqrt(abs(x) + abs(y))
    
def anotherBadFunction():
    print( ' This function has bad spacing ' )
    return badFunction( 10 , -20 )

x=anotherBadFunction( )

print( x )

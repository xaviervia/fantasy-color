SECONDARY: 48 - 84 (36)
PRIMARY: 79 - 45 (34)
ALMOND: 89 - 53 (36)
BRASS: 68 - 36 (32)
DARK OLD PURPLE: 42 - 7 (35) - 75 (33)
LIGHT CYAN: 96 - 58 (38)
DARK BROWN: 42 - 76 (34)
PURE GREEN: 87 - 48 (39)
PURE RED: 54 - 10 (44)
PURE MAGENTA: 60 - 17 (43)


f(z) = 1 / (1 + Math.exp(-z))

f(z) * (1 + Math.exp(-z)) = 1
1 + Math.exp(-z) = 1 / f(z)

Math.exp(-z) = (1 / f(z)) - 1

-z = Math.log( ( 1 / f(z) ) - 1 )

z = -Math.log( ( 1 / f(z) ) - 1 )

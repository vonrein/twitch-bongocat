
const exampleSongs = [
{
    name: "Twinkle Twinkle Little Star",
    notation: "!bongo 1 1 5 5 6 6 5 . 4 4 3 3 2 2 1 . 5 5 4 4 3 3 2 . 5 5 4 4 3 3 2 . 1 1 5 5 6 6 5 . 4 4 3 3 2 2 1"
  },
  {
    name: "Ode to Joy",
    notation: "!bongo !bongo ,150 3 3 4 5 5 4 3 2 1 1 2 3 3 2 2 . 3 3 4 5 5 4 3 2 1 1 2 3 2 1 1"
  },
  {
    name: "Mii Channel Theme (short)",
    notation: "!bongo wr rz zi rz wr . w w w . qw wr rz zi rz wr"
  },
  {
	name:"Africa",
	notation:"!bongo ,300 1#v6v3x 1#v6v3asx 1#v6v3 1#v6v3ax 1#v6v3ax v7v5#v2#asx 31#v5# ax x asx . ax ax asx . ax 1#v6v3x 1#v6v3asx 1#v6v3 1#v6v3ax 1#v6v3ax v7v5#v2#asx 31#v5# ax x asx . ax ax asx . ax 1#v6v3x 1#v6v3asx 1#v6v3 1#v6v3ax 1#v6v3ax v7v5#v2#asx 31#v5# ax x asx . ax ax asx . ax 1#v6v3x 1#v6v3asx 1#v6v3 1#v6v3ax 1#v6v3ax v7v5#v2#asx 31#v5# ax x asx . ax ax asx . ax r#2#v7v4#x r#asx r# r#ax r#1#v6#ax asx t# y#ax u2#v7v4#x asx . ax w#ax w#asx e r#ax e1#v6v3x asx e w#ax q#v7v5#ax asx q# vuax w#2#v4#x asx q# vuax q#1#v6v3ax 1#v6v3asx 1#v6v3 1#v6v3ax 1#v6v3x v7v5#v2#asx 31#v5# ax r#2#v7v4#ax r#asx r# r#ax r#1#v6#x asx t# y#ax u2#v7v4#ax asx . ax w#x w#asx e r#ax e1#v6v3ax easx . w#ax q#v7v5#x asx q# vuax w#2#v4#ax asx q# vuax q#1#v6v3x 1#v6v3asx 1#v6v3 1#v6v3ax 1#v6v3ax v7v5#v2#asx 31#v5# ax r#2#v7v4#x r#asx r# r#ax r#1#v6#ax asx t# y#ax u2#v7v4#x asx . ax w#ax w#asx e r#ax e1#v6v3x asx e w#ax q#v7v5#ax asx q# vuax 1#v6v3x v7v5#v2#asx 31#v5# ax r#2#v7v4#ax r#asx r# ax r#1#v6#x r#asx t# y#ax u2#v7v5#ax asx . ax ^w#ux ^w#uasx ^e^q# ^r#^w#ax ^r#^w#1#v6v3ax ^e^q#1#v6v3asx ^w#u1#v6v3 ^e^q#1#v6v3ax 1#v6v3x v7v5#v2#asx 2#v7v5# ax ax asx . ax x asx . ax ^y64#1#v6ax ^yasx ^y ^yax 2x ^yasx ^y ^yax ^y31#ax asx ^t# ^t#ax 5#v7v5#x asx 6 5#ax ^yeq#64#1#v6ax ^yeq#asx ^yeq# ^yr#wax ^yr#w64#1#v6x ^yr#wasx ^yr#w ^yeq#ax 2ax ^yeq#asx ^t#evu ax ^t#evu31#x asx . ax ^yeq#5#v7v5#ax ^yeq#asx ^yeq#6 ^yr#w5#ax 64#1#v6x r#wasx ^yr#w ^yeq#ax ^y64#1#v6ax eq#asx ^t#evu ^t#ax evu2x asx . ax ^yeq#31#ax ^yeq#asx ^yeq# ^yr#wax ^yr#w5#v7v5#x ^yr#wasx ^yr#w6 ^yeq#5#ax 64#1#v6ax ^yeq#asx ^t#evu ax ^t#evu2x asx ^r#q#vy ^rvuvt#ax ^t#evu31#ax asx ^yq# ^t#vuax ^r#q#vy#5#v5#x asx . ax v6#v3ax asx . ax"
	},
	{"name": "All Bongo Sounds",
	"notation":"!bongo AL SL DL FL GL ML XL CL BL NL 1L 2L 3L 4L 5L 6L 7L 8L 9L 0L QL WL EL RL TL YL UL IL OL PL A S D F G M X C B N ^1 ^1# ^2 ^2# ^3 ^4 ^4# ^5 ^5# ^6 ^6# ^7 1 1# 2 2# 3 4 4# 5 5# 6 6# 7 V1 V1# V2 V2# V3 V4 V4# V5 V5# V6 V6# V7 ^Q ^Q# ^W ^W# ^E ^R ^R# ^T ^T# ^Y ^Y# ^U Q Q# W W# E R R# T T# Y Y# U VQ VQ# VW VW# VE VR VR# VT VT# VY VY# VU"
	},
  {
    "name": "TR-808",
    "notation": "!bongo ,254 x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b x b c b"
  },
  {
    "name": "Ranma 1/2",
    "notation": "!bongo ,600 fx . . . . . . . . . tw rq wvyx . qvtx . vyvex . x . cx . . . 3x . 5x . 5 . . . 3x . 5 . 5c . . . 6x . 7x . 6 . . . evu5x wvy qvt . vyvec . c . 3x . 5x . 5 . . . 3x . 5 . 5c . . . 2x . 3x . 2 . t1 . ^q1x . t . yfc . t . 3x . 5x . 5 . . . 3x . 5 . 5c . . . 6x . 7x . 6 . . . 5x . ue yw tqc . evyc . 3x . 5x . 5 . . . 3 . 5 . 5 . . . 2 . 3 . 2 . 1 t 1 ^q . t . y . t"
  },
  {
    "name": "In the cave of the mountain king (WIP)",
    "notation": "!bongo ,200 v5 v6 v7 1 2 v7 2 . 1# v6 1 . 1# v6 1 . v5 v6 v7 1 2 v7 2 5 4 2 v7 2 4"
  },
  {
    "name": "Miau Patsch Miau Patsch",
    "notation": "!bongo m . f . m . f . m . f . f . f . m . f . m . f . f . f . f"
  },
  {
    "name": "White shark (WIP)",
    "notation": "!bongo ,200 vevr . . . vevr . . . ve vr ve vr ve vr ve vr z# ve vr ve vr z# bng ve vr ve vr z z 3# 5# ^w"
  },
  {
    "name": "cdefghahc...(Marimba)",
    "notation": "!bongo vq vw ve vr vt vz vu q w e r t z u ^q ^w ^e ^r ^t ^z ^u"
  },
  {
    "name": "cdefghahc...(Piano)",
    "notation": "!bongo v1 v2 v3 v4 v5 v6 v7 1 2 3 4 5 6 7 ^1 ^2 ^3 ^4 ^5 ^6 ^7"
  },
  {
    "name": "Mii channel theme",
    "notation": "!bongo u3 . u3 . i5 . p7 . p7 . i5 . u3 . t2 . e0 . e0 . t2 . u3 . u3 . . t2 t2 . . . u3 . u3 . i5 . 7p . 7p . 5i . u3 . t2 . e0 . e0 . t2 . u3 . t2 . . e0 e0 . . . t2 . t2 . u3 . e0 . t2 . u3 i5 u3 . e0 . t2 . u3 i5 u3 . t2 . e0 . t2 . p7 . u3 . . . u3 . i5 . p7 . p7 . i5 . u3 . t2 . e0 . e0 . t2 . u3 . t2 . . e0 e0"
  },
  {
    "name": "Crazy Train",
    "notation": "!bongo ,400 v4# v4# . . . . . . v6 v6 . . v3 v3 . . v4# v4# . . . . . . 2 2 . . v3 v3 . . r#v4# r#v4# ^q# r# ^w r# ^q# r# uv6 yv6 t# y uv3 yv3 t# e r#v4# r#v4# ^q# r# ^w r# ^q# r# u2 y2 t# y uv3 yv3 t# e r#v4# r#v4# ^q# r# ^w r# ^q#v6 r#v6 u y t#v3 yv3 u y t#v4# ev4# r# r# ^q# r# ^w r# ^q# . ^y^w2 2 2 2 ^t#^ev3 v3 v3 v3 6v6 . ^e^q#y6v6 . 6v6 ^eut# 6v6 . ^wyr#v6 6 v6 ^q#ye5# . . q#vu4# ye3 6v6 . ^e^q#y6v6 . 6v6 ^eut# 6v6 . ^wyr#v6 6 v6 ^q#ye5# . uyt r#e4# wq#vu3 . . . ."
  },
  {
    "name": "Happy birthday",
    "notation": "!bongo ,450 b . b . w# w# fbxev5# . bw# . bt# b bxtv2# . b . bw# bw# bxrv2# . bw# . by# b bxt#v5# . b b bw# bw# fbx^w#v5# . b^q . bt#1 bt# bxt1# . br . b^q# b^q# bx^q2# . bt# . by#v2# . bxt#v5# . b b bw# bw# fbxrv5# . bw# . bt# . bxtv2# . b . bw# bw# bxr2# . bw# b by# b bxt#v5# . b . bw# bw# fbx^w#^q#v5# . b^q . bt#1 bt# bxt1# . br b b^q# b^q# bx^q2# . bt# . by#v2# b bxt# . v5#"
  },
  {
    "name": "Nokia:",
    "notation": "!bongo ,400 ^3 ^2 4# . 5# . ^1# 7 2 . 3 . 7 6 1# . 3 . 6 . . ."
  },
  {
    "name": "Tetris (Lixou Version):",
    "notation": "!bongo ,400 ^3 . 7 ^1 ^2 ^3^2 ^1 7 6 . 6 ^1 ^3 . ^2 ^1 7 . 7 ^1 ^2 . ^3 . ^1 . 6 . 6 6 76 ^2^1 ^3 ^2 . ^4 ^6 . ^5 ^4 ^3 . . ^1 ^3 . ^2 ^1 7 . 7 ^1 ^2 . ^3 . ^1 . 6 . 6 . . . ^33bx . 7v7bc ^11. ^22bx ^3^232x ^11bc 7v7. 6v6bx . 6v6bc ^11. ^33bx . ^22ncx ^11. 7v7bx . 7v7bc ^11. ^22bx .x ^33bc . ^11bx . 6v6bc . 6v6bx 6v6x 76v7v6nc ^2^121. ^33bx ^22. .bc ^44. ^66bx .x ^55bc ^44. ^33bx . .bc ^11. ^33bx . ^22ncx ^11. 7v7bx . 7v7bc ^11. ^22bx .x ^33bc . ^11bx . 6v6bc . 6v6bx .x .nc ."
  },
  {
    "name": "Tetris (normal):",
    "notation": "!bongo ,550 v3^w7 . w37^3 . v3 . w35#7 . v36^1 . w37^2 . v3^3 ^2 w36^1 . v35#7 . w636 . v6 . w636 . v66^1 . w6^3^1 . v6 . w67^2 . v66^1 . w5#5#7 . v5#3 . w5#5# . v5#6^1 . w37^2 . v3 . w3^3^1 . v3 . w66^1 . v6 . w663 . v6 . w663 . v6 . w7 . v1 . v2 . w24^2 . . . w26^4 . ^1^6 . w2^1 ^1 w67^5 . w46^4 . w15^3 . v1 . . . v13^1 . w15^3 . w56 5 4^2 . w53^1 . w75#7 . v73 . 5#7 . v76^1 . 7^2 . v35# . ^1^3 . v5#5# . w66^1 . v33 . w636 . v3 . w636 . . . . . . ."
  },
  {
    "name": "???",
    "notation": "!bongo ,500 ^eqvy . ^q . ^w . ^q . qvyvr . r . y . r . wvuvt . t . u . t . eqvy . y . ^q . y . ^eqvy . ^q . ^w . ^q . qvyvr . r . y . r . wvuvt . t . u . t . eqvy . y . ^q . y ."
  },
  {
    "name": "Darude Sandstorm",
    "notation":"!bongo ,600 e . . e . . e . e . . e . . y . y . . y . . t . t . . t . . w . e . . e . . e . e . . e . . y . y . . y . . t . t . . t . . w . e e e . t . t . e e e . t . t . e e e e e e e e e e e e e e e e e e e e e . e e e e e e e . y y y y y y y . t t t t t t t . w . e e e e e . e e e e e e e . y y y y y y y . t t t t t t t . w . . m"
},
  {
    "name": "eurovision",
    "notation": "!bongo ,300 q . r . r t y . r . ^q . . . y . . y y# . ^q y# y y# ^q . t r t y t . q . r . r t y . r . ^q . . . y . . y y# ^q y y# t . . r r m"
  },
  {
    "name": "Atemlos:",
    "notation": "!bongo ,300 ^5# . . . ^5# . ^4# ^2# . . . . ^2# . ^4# ^4# . 6# . 6# . ^1# . 7 . . . . ^7 . ^6# . ^5# . . . ^5# . ^4# ^2# . . . . ^2# . ^4# ^4# . 6# . 6# . ^1# . 7 . . . . ^7 . ^6# . ^5# . . . ^5# . ^4# ^2# . . . . ^2# . ^4# ^4# . 6# . 6# . ^1# . 7 ."
  },
  {
    "name": "Sailormoon",
    "notation": "!bongo ,400 q q qx c tx c tx1 c5 qx^1 qc vuxv5 tc x2 tc xv5 c2 vux5 vucx vycx c tx3 c txv6 c3 tx6 c yxv3 tc xv7 ec xv3 cv7 wx3 cx wcxv4 ec xv6 qc xv4 cv6 x2 c xv2 c xv6 c xv2 cv6 ex2 cx ecxv5 wc x2 wc xv5 ec2 x5 c xv5 c x2 c xv5 c2 qx5 qcx qcx c tx c tx1 c5 qx^1 qc vuxv5 tc x2 tc xv5 c2 vux5 vuc vyx c tx3 c txv6 c3 tx6 tc yxv3 tc xv7 ec xv3 cv7 wx3 c wxv4 ec x1 q0 0v4 01 04 0 0v2 0 0v6 0 0v2 0v6 e02 0 e0v5 w0 02 w0 0v5 q02 e05 0 w0v5 0 02 0 0v5 02 05 0"
  },
  {
    "name": "???",
    "notation": "!bongo ,300b bc 1bc 2#bc 5bx b 4bc 2#bx 4bx 5b bc 5b 4bx 2#b 1bc 2#bx bx 1b bc 5bc 4bx 2#b 1bc 2#bx bx 1b bc 1b v6#bx 1b bc bx bx bc 1bc 2#bc 5fbx b 4bc 2#bx 4bx 5b bc 5b 6#bx 5b 4bc 4bx bx 5b bc bc bx b bc bx 5bx b bc b 6#bx bc bc bc ^1bx b b b m"
  },
  {
    "name": "???",
    "notation": "!bongo ,670 2#b . 2# . 2#b . 2# . 4#b . 2# . 4#b . 4 . 2#b . 4 . 2b . 2 . 2c . 2 2 2#b . 2# . 2#b . 2# . 4#b . 2# . 4#b . 4 . 2#b . 4 . 2b . 2 . 2b . 2 2b 6#c . . . . . . 6c . .b . 4#c . . . 2#b . 2# . 2#b . 2# . 4#b . 2# . 4#b . 4 . 2#b . 4 . 2b . 2 . 2b . 2 23 m"
  },
  {
    "name": "ducktales:",
    "notation": "!bongo ,240 vex ec vex ec vex ec vex evec vex ec ve3v3 e5#v5# ve7v7 e^1#1# ve^22 eve^1# ve7v7 e6v6 ve64# ec ve5#3 ec ve64# evec ve5#3 ec ve3v3 e5#v5# ve7v7 e^1#1# ve^22 eve^1# ve7v7 e6v6 vy^26 yc vy^1#6 yc vy^26 cx vy^1#6 vtc vr#x r#4#c vr#6x r#^1#c vux cx vu7x vt#c vr#x r#^1#c vr#^3x r#^4#c vu^5#x cx vu^4#x vt#c ve^37x ec vefx mec vex evec vex ec vq^3x q^2c vq^1x q^2c vq#^3x w^2c vq#^1x w^2c ve^37x e^37c vefx mec vex evec vex ec vq^3x q^2c vq^1x q^2c vw^3x w^2cx vw^1x w^2c ve^3^1 e^3^1 vefx m"
  },
  {
    "name": "Löwenzahn:",
    "notation": "!bongo ,350 v5 . . . 5 . . . 4 3 . 2 . v5 v7 2 v5 . . . 5 . . . 4 3 . . 2 . . . 1 . . . ^1 . . . 6# 6 . 5 . 1 3 5 1 . . . ^1 . . . 6# 6 . . 5 . 5 6 v57 . 7 . 5 . . . 4 3 . 2 . v57 v76 25 v52 . 2 . 5 . . . 4 3 . . 2 . 5 6 v57 . 7 . 57 6 5 2 4 3 2 2 . v52 v75 26 v57 . 7 . 57 6 5 ^2 43 32 ^2 . 2^2 . ^2 ^3 ^4 . ^4 . ^4 ^3 ^2 ^1 . . ^1 . 5 6 6# 6 . . . ^3 . ^6 m"
  },
  {
    "name": "???",
    "notation": "!bongo ,400 f . . . . . . . w2 r4 y#6# ^w6# . ^w6# . y#2 ^q2# . ^w#5 . ^w4 . y#2 . vy#v6# w2 r4 y#2 . y#2 . q1 y4 . ^q2# . y#2 . . . w2 r4 y#6# ^w6# . ^w6# . y#2 ^q2# . ^w#5 . ^w4 . y#2 . vy#v6# w2 r4 y#2 . y#2 . q1 y4f . ^q2# . y#6# w2 y#6# w6# y#2v6# . . 42 r y#1v6 . y# 1v6 y# y1v6 . ^q2v6# . y#2v6# . r2v6# 42 6#4 ^26# w r^26# . r^26# ^16 r q41 . r2v6# . w . 2v6# . r y#42 . y#1v6 y# . y1v6 . ^q1v6 . y#2v6# . r2v6# . 2v6# 42 w6#4 r^26# . r^26# . r^26# q^16 . r^16 w"
  },
  {
    "name": "Underthesea",
    "notation": "!bongo ,400 f . . . . . . . w2 r4 y#6# ^w6# . ^w6# . y#2 ^q2# . ^w#5 . ^w4 . y#2 . vy#v6# w2 r4 y#2 . y#2 . q1 y4 . ^q2# . y#2 . . . w2 r4 y#6# ^w6# . ^w6# . y#2 ^q2# . ^w#5 . ^w4 . y#2 . vy#v6# w2 r4 y#2 . y#2 . q1 y4f . ^q2# . y#6# w2 y#6# w6# y#2v6# . . 42 r y#1v6 . y# 1v6 y# y1v6 . ^q2v6# . y#2v6# . r2v6# 42 6#4 ^26# w r^26# . r^26# ^16 r q41 . r2v6# . w . 2v6# . r y#42 . y#1v6 y# . y1v6 . ^q1v6 . y#2v6# . r2v6# . 2v6# 42 w6#4 r^26# . r^26# . r^26# q^16 . r^16 w"
  },
  {
    "name": "Most maskulin song ever:",
    "notation": "!bongo ,350 5 3 5 ^1 6 . . . 4# 2# 4# 7 5# . 4# 3 . . 3 1# 4# . 1# . . . 4# 3 5# . 4# . 5# 3 5# ^1# 6 . . 5# 4# 2# 4# 7 5# ."
  },
  {
    "name": "Monkey Island Le Chuck theme:",
    "notation": "!bongox rtttl d=4,o=5,b=200:g,8p,8g,8a#,8p,8d6,8p,8c#6,8p,8c#6,8p,a,p,8d#,8p,8d#,8p,d#,p,8d,8p,8d,8p,d,p,g,8p,8g,8a#,8p,8d6,8p,8e6,8p,8e6,8p,c#6,p,8c,8p,8c,8p,8c,8p,8c,8p,2d,2p"
  },
  {
    "name": "Mission Impossible",
    "notation": "!bongox rtttl d=16,o=6,b=95:32d,32d#,32d,32d#,32d,32d#,32d,32d#,32d,32d,32d#,32e,32f,32f#,32g,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,a#,g,2d,32p,a#,g,2c#,32p,a#,g,2c,a#5,8c,2p,32p,a#5,g5,2f#,32p,a#5,g5,2f,32p,a#5,g5,2e,d#,8d',"
  },
  {
    "name": "Monkey Island Largo Lagrande theme:",
    "notation": "!bongox rtttl d=4,o=5,b=90:16g,16f#,16p,16g,16p,8a#,16p,16g,16f#.,16g,16p,8c#.,16p,16g,16f#.,16g,16a.,16a#,16c.6,16d6,16p,d#.6,8p,16d6,16c#.6,16d6,16p,16d6,16c#.6,16d6,16p,16d6,16f6,16p,16f6,16d6,16p,16d,16c#.,16d,16a#.,16g,16f.,8g.,8p,16d#,16p,16d#.,8d."
  },
  {
    "name": "???",
    "notation": "!bongox rtttl d=4,o=5,b=100:8c6,16p,16g,16c6,16d6,8d#.6,8d.6,8c6,16p,16g,16c6,16d6,g6,8p,c6,8p,d#6,16p,16c6,8c#6,16d#6,8f6,b.6,16p,8c6,16p,16g,16c6,16d6,8d#.6,8d.6,8c6,16p,16f#,16c6,16d#6,8f#.6,8f.6,8d#6,8g6,8p,8b6,8d#.7,2c7"
  },
  {
    "name": "Monkey Island Scumbar",
    "notation": "!bongox rtttl d=4,o=5,b=180:8g,8p,8g,8a,a#,8a,8g,8c6,8p,8c6,8p,c6,8a#,8a,8g,8p,8g,8a,a#,8a,8g,8d6,8p,8d6,8p,1d6,p,8d6,8p,8d6,8d#6,8f6,8p,8f6,8p,8d6,8p,8d6,8d#6,8f6,8p,8f#6,8p,g6,8d6,8p,d#6,8d6,8c6,d6,8c6,8a#,c6,8a#,8a,g.,8a,a#.,8c6,8d6,8d#6,8d6,8c6,a#,g,g.6,8d6,d#6,8d6,8c6,a#,a,a#,1g"
  },
  {
    "name": "???",
    "notation": "!bongox rtttl MainTitl:d=4,o=5,b=100:16c#6,16p,8g#6,16p,16d#6,16p,8a#6,16p,16a#6,16a#6,8c#7,16p,16c#7,16p,8g#6,8a#6,16a#6,16p,8c#6,8c#6,8g#6,8g#6,16a#6,16a#6,16c#7"
  },
  {
    "name": "???",
    "notation": "!bongox rtttl d=4,o=5,b=100:8b,8b,32b,16p,32p,16a,16b,16d6,16b,16p,16a,8b.,16p,16g,16p,8g,32g,32p,8f#,8f#,32f#,32p,8a,8a#"
  },
  {
    "name": "Take on me",
    "notation": "!bongox rtttl d=4,o=4,b=160:8f#5,8f#5,8f#5,8d5,8p,8b,8p,8e5,8p,8e5,8p,8e5,8g#5,8g#5,8a5,8b5,8a5,8a5,8a5,8e5,8p,8d5,8p,8f#5,8p,8f#5,8p,8f#5,8e5,8e5,8f#5,8e5,8f#5,8f#5,8f#5,8d5,8p,8b,8p,8e5,8p,8e5,8p,8e5,8g#5,8g#5,8a5,8b5,8a5,8a5,8a5,8e5,8p,8d5,8p,8f#5,8p,8f#5,8p,8f#5,8e5,8e5"
  },
  {
    "name": "Super Mario Bros underwater",
    "notation": "!bongox rtttl d=8,o=6,b=225:4d5,4e5,4f#5,4g5,4a5,4a#5,b5,b5,b5,p,b5,p,2b5,p,g5,2e.,2d#.,2e.,p,g5,a5,b5,c,d,2e.,2d#,4f,2e.,2p,p,g5,2d.,2c#.,2d.,p,g5,a5,b5,c,c#,2d.,2g5,4f,2e.,2p,p,g5,2g.,2g.,2g.,4g,4a,p,g,2f.,2f.,2f.,4f,4g,p,f,2e.,4a5,4b5,4f,e,e,4e.,b5,2c."
  },
  {
    "name": "Super Mario Bros 2",
    "notation": "!bongox rtttl Mario2:d=4,o=5,b=125:32p,8g,16c,8e,8g.,16c,8e,16g,16c,16e,16g,8b,a,8p,16c,8g,16c,8e,8g.,16c,8e,16g,16c#,16e,16g,8b,a,8p,16b,8c6,16b,8c6,8a.,16c6,8b,16a,8g,16f#,8g,8e.,16c,8d,16e,8f,16e,8f,8b.4,16e,8d.,c"
  },
  {
    "name": "Super Mario World:",
    "notation": "!bongox rtttl MarioWorld:d=4,o=5,b=125:a,8f.,16c,16d,16f,16p,f,16d,16c,16p,16f,16p,16f,16p,8c6,8a.,g,16c,a,8f.,16c,16d,16f,16p,f,16d,16c,16p,16f,16p,16a#,16a,16g,2f,16p,8a.,8f.,8c,8a.,f,16g#,16f,16c,16p,8g#.,2g,8a.,8f.,8c,8a.,f,16g#,16f,8c,2c6"
  },
  {
    "name": "Super Mario winning fanfare:",
    "notation": "!bongo ,350 v5 1 3 5 ^1 ^3 ^5 . . ^3 . . v5# 1 2# 5# ^1 ^2# ^5# . . ^2# . . v7 2 4 7 ^2 ^4 ^7 . . ^7 ^7 ^7 m"
  },
  {
    "name": "Final countdown",
    "notation": "!bongox rtttl d=4,o=5,b=125:p,8p,16b,16a,b,e,p,8p,16c6,16b,8c6,8b,a,p,8p,16c6,16b,c6,e,p,8p,16a,16g,8a,8g,8f#,8a,g.,16f#,16g,a.,16g,16a,8b,8a,8g,8f#,e,c6,2b.,16b,16c6,16b,16a,1b"
  },
  {
    "name": "???",
    "notation": "!bongox rtttl 4C2 4D2 4E3 4D2 4C2 4D3 4G2 4G2"
  },
  {
    "name": "Doom",
    "notation": "!bongox rtttl d=4,o=5,b=112:16e4,16e4,16e,16e4,16e4,16d,16e4,16e4,16c,16e4,16e4,16a#4,16e4,16e4,16b4,16c,16e4,16e4,16e,16e4,16e4,16d,16e4,16e4,16c,16e4,16e4,a#4,16p,16e4,16e4,16e,16e4,16e4,16d,16e4,16e4,16c,16e4,16e4,16a#4,16e4,16e4,16b4,16c,16e4,16e4,16e,16e4,16e4,16d,16e4,16e4,16c,16e4,16e4,a#4,16p,16a4,16a4,16a,16a4,16a4,16g,16a4,16a4,16f,16a4,16a4,16d#,16a4,16a4,16e,16f,16a4,16a4,16a,16a4,16a4,16g,16a4,16a4,16f,16a4,16a4,d#"
  },
  {
    "name": "Star Wars",
    "notation": "!bongox rtttl d=4,o=5,b=45:32p,32f#,32f#,32f#,8b.,8f#6.,32e6,32d#6,32c#6,8b6.,16f#6.,32e6,32d#6,32c#6,8b6.,16f#6.,32e6,32d#6,32e6,8c#6.,32f#,32f#,32f#,8b.,8f#6.,32e6,32d#6,32c#6,8b6.,16f#6.,32e6,32d#6,32c#6,8b6.,16f#6.,32e6,32d#6,32e6,8c#6"
  },
  {
    "name": "Hölle Hölle Hölle",
    "notation": "!bongo ,300 fxq#v6 n6 bxv6 nq#6 xv6 n6 bxv6 n6 xq#v6 nq#6 bxwv6 ne6 xv6 ne6 bxr#v6 n6 xwv3 n3 bxv3 nw3 xv3 n3 bxv3 n3 xv3 n3 bxv3 n3 xv3 n3 bxv3 n3 fxwv7 n7 bxv7 nw7 xv7 n7 bxv7 n7 xr#v7 n7 bxr#v7 nt#7 xv7 nt#7 bxyv7 n7 xq#v6 n6 bxv6 nq#6 xv6 nw6 bxq#v6 nvu6 xv3 n3 bxv3 n3 xev3 n3 bxwv3 n3 fxq#v6 n6 bxv6 nq#6 xv6 n6 bxv6 n6 xq#v6 n6 bxwv6 ne6 xv6 ne6 bxev6 n6 xr#v3 n3 bxv3 n3 xev3 n3 bxv3 n3 xv3 n3 bxv3 n3 xv3 n3 bxv3 n3 xr#v7 n7 bxv7 r#7n v7x 7n v7bx 7n r#v7x 7n r#v7bx t#7n v7x t#7n yv7bx 7n #"
  },
  {
    "name": "Star Wars Empire march",
    "notation": "!bongox rtttl d=4,o=5,b=112:8g,16p,8g,16p,8g,16p,16d#.,32p,32a#.,8g,16p,16d#.,32p,32a#.,g,8p,32p,8d6,16p,8d6,16p,8d6,16p,16d#.6,32p,32a#.,8f#,16p,16d#.,32p,32a#.,g,8p,32p,8g6,16p,16g.,32p,32g.,8g6,16p,16f#.6,32p,32f.6,32e.6,32d#.6,16e6,8p,16g#,32p,8c#6,16p,16c.6,32p,32b.,32a#.,32a.,16a#,8p,16d#,32p,8f#,16p,16d#.,32p,32g.,8a#,16p,16g.,32p,32a#.,d6,8p,32p,8g6,16p,16g.,32p,32g.,8g6,16p,16f#.6,32p,32f.6,32e.6,32d#.6,16e6,8p,16g#,32p,8c#6,16p,16c.6,32p,32b.,32a#.,32a.,16a#,8p,16d#,32p,8f#,16p,16d#."
  },
  {
    "name": "Star Wars Cantina Band",
    "notation": "!bongox rtttl d=4,o=5,b=250:8a,8p,8d6,8p,8a,8p,8d6,8p,8a,8d6,8p,8a,8p,8g#,a,8a,8g#,8a,g,8f#,8g,8f#,f.,8d.,16p,p.,8a,8p,8d6,8p,8a,8p,8d6,8p,8a,8d6,8p,8a,8p,8g#,8a,8p,8g,8p,g.,8f#,8g,8p,8c6,a#,a,g"
  },
  {
    "name": "Holzmichel",
    "notation": "!bongox rtttl o=5,d=4,b=125:g#,8g#,8g,8g#,8a#,c6,8c6,8a#,g#,a#,8a#,8g#,g,c6,8c6,8a#,g#,g#,8g#,8g,8g#,8a#,c6,8c6,8a#,g#,a#,c6,a#,g#,2p,2c6,a#,g#,g#,8p,8g#,a#,a#,8p,8a#,g#,g#,p,2c6,a#,g#,g#,8p,8g#,a#,c6,a#,g#"
  },
  {
    "name": "Samba dejaneiro",
    "notation": "!bongox rtttl d=4,o=6,b=50:16a#.5,8c#,32a#.5,16d#.,32c#.,32d#.,8f,16c#,16a#.5,16a#.5,16c#.,16f,8a#,32g#.,32a#.,8c7,16g#,16f.,16f.,16a#.,16f,8d#,32c#.,32d#.,16f.,16c#.,16a#.5,16a#.,16c#.7,16a#.,16a#.,32g#.,32a#.,16c.7,16g#.,a#.,16a#.5,8c#,32a#.5,16d#.,32c#.,32d#.,8f,16c#,16a#.5,16a#.5,16c#.,16f,8a#,32g#.,32a#.,8c7,16g#,16f.,16f.,16a#.,16f,8d#,32c#.,32d#.,16f.,16c#.,16a#.5,16a#.,16c#.7,16a#.,16a#.,32g#.,32a#.,16c.7,16g#.,a#"
  },
  {
    "name": "Benny hill theme",
    "notation": "!bongox rtttl d=4,o=5,b=125:8d.,16e,8g,8g,16e,16d,16a4,16b4,16d,16b4,8e,16d,16b4,16a4,16b4,8a4,16a4,16a#4,16b4,16d,16e,16d,g,p,16d,16e,16d,8g,8g,16e,16d,16a4,16b4,16d,16b4,8e,16d,16b4,16a4,16b4,8d,16d,16d,16f#,16a,8f,d,p,16d,16e,16d,8g,16g,16g,8g,16g,16g,8g,8g,16e,8e.,8c,8c,8c,8c,16e,16g,16a,16g,16a#,8g,16a,16b,16a#,16b,16a,16b,8d6,16a,16b,16d6,8b,8g,8d,16e6,16b,16b,16d,8a,8g,g"
  },
  {
    "name": "Akte X",
    "notation": "!bongox rtttl Xfiles:d=4,o=5,b=125:32p,e,b,a,b,d6,2b.,p,e,b,a,b,e6,2b.,p,g6,f#6,e6,d6,e6,2b.,p,g6,f#6,e6,d6,f#6,2b.,p,e,b,a,b,d6,2b.,p,e,b,a,b,e6,2b.,p,e6,2b."
  },
  {
    "name": "Smoke on the water",
    "notation": "!bongox rtttl d=4,o=5,b=112:c,d#,f.,c,d#,8f#,f,p,c,d#,f.,d#,c,2p,8p,c,d#,f.,c,d#,8f#,f,p,c,d#,f.,d#,c,p"
  },
  {
    "name": "???",
    "notation": "!bongox rtttl LeisureSuit:d=16,o=6,b=56:f.5,f#.5,g.5,g#5,32a#5,f5,g#.5,a#.5,32f5,g#5,32a#5,g#5,8c#.,a#5,32c#,a5,a#.5,c#.,32a5,a#5,32c#,d#,8e,c#.,f.,f.,f.,f.,f,32e,d#,8d,a#.5,e,32f,e,32f,c#,d#.,c#"
  },
  {
    "name": "Sound of silence",
    "notation": "!bongox rtttl d=4,o=6,b=40:32d#.5,32d#.5,32f#.5,32f#.5,32a#.5,32a#.5,g#5,32c#.5,32c#.5,32c#.5,32f.5,32f.5,32g#.5,32g#.5,f#5,32f#.5,32f#.5,32f#.5,32a#.5,32a#.5,32c#.,32c#.,8d#.,c#,32f#.5,32f#.5,32a#.5,32a#.5,32c#.,32c#.,8d#.,c#,16f#.5,16f#.5,32d#.,d#,32d#.,32f.,32f#.,8f#,32f.,8d#,c#,32d#.,32c#.,a#5,16f#.5,16f#.5,16f#.5,c#,32f.5,32f#.5,d#.5"
  },
  {
    "name": "Langsam und gleichmäßig:",
    "notation": "!bongo ,100 vR vY vT vQ . vR vT vY vR . vY vR vT vQ . vQ vT vY vR . vQ . vQ . vQ . vQ . vQ . vQ . vQ . vQ . vQ . m"
  },
  {
    "name": "Schnell:",
    "notation": "!bongox rtttl d=4,o=5,b=240:16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7,16b7#,16b7"
  },
  {
    "name": "Fröhlich:",
    "notation": "!bongox rtttl d=16,o=5,b=160:32p,e6,p,e6,p,e6,p,e6,p,4e6,d6,p,c6,p,a,p,2c6,8p,c6,p,d6,p,e6,p,e6,p,e6,p,e6,p,e6,p,e6,p,d6,p,c6,p,a,p,2c6,8p,c6,p,c6,p,d6,p,d6,p,d6,p,a,p,c6,p,d6,p,8e6,p,e6,f6,f6,e6,p,d6,p,c6,p,a,p,c6,p,8d6,8p"
  },
  {
    "name": "???",
    "notation": "!bongox rtttl d=4,o=5,b=125:32p,16g#,16g#,16g#,16g#,8g#,8a#,8g#,f,16c#,16d#,16c#,8d#,8d#,8c#,2f,8g#,8g#,8g#,8a#,8g#,f,c#6,8c#6,8c6,8g#,8a#,16c6,16a#,g#"
  },
  {
    "name": "Parade:",
    "notation": "!bongo ,400 t#c t#c ^q#cx . t#c . rc . t#c . rcx . t#c . ^q#c . ^rc . ^w#cx . ^w# ^w#c ^w#x . ^q#c ^w# ^rx . ^w# . ^q# . t#c t#c ^q#fcx . t#c . rc . t#c . rcx . t#c . ^q#c . ^rc . ^w#cx . ^w# ^w#c ^w#x . ^rc ^w# ^q#x . . . . . ^rc c ^w#cx . c . c . ^rc . ^w#fcx . c . c . ^rc . ^w#fcx . ^r c ^w#fx . ^rc . ^w#fx . . . . . c c ^q#cx . t#c . rc . t#c . rcx . t#c . ^q#c . ^rc . ^w#cx . ^w# ^w#c ^w#x . ^rc ^w# ^q#x"
  },
  {
    "name": "Sempervideo (Canon in d Major):",
    "notation": "!bongox rtttl Canon:d=16,o=6,b=125:8a#.,g.,g#.,8a#.,g.,g#.,a#.,a#.5,c.,d.,d#.,f.,g.,g#.,8g.,d#.,f.,8g.,g.5,g#.5,a#.5,c.,a#.5,g#.5,a#.5,g.5,g#.5,a#.5,8g#.5,c.,a#.5,8g#.5,g.5,f.5,g.5,f.5,d#.5,f.5,g.5,g#.5,a#.5,c.,8g#.5,c.,a#.5,8c.,d.,d#.,a#.5,c.,d.,d#.,f.,g.,g#.,8a#"
  },
  {
    "name": "I was made for loving you babe",
    "notation": "!bongo ,250 evuvt . r#vuvy . tvuve . y uvyve . u yvuvt . t . r# . eqvy . r#qvy . tqve y . uqvy . u yvr#vw# . . . qvyvr# w evuvt . r#vuvy . tvuve . y uvyve . u yvuvt . t . r# . eqvy . r#qvy . tqve . y uqvy . u yvr#vw# . . . vuvtve . vyvr#vw . . . . . . ."
  }
]

export default exampleSongs;

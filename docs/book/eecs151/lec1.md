# EECS151 Introduction to Digital Design and Integrated Circuits


课程主页：https://inst.eecs.berkeley.edu/~eecs151/fa22/index.html


## Lecture 1 Introduction

https://www.youtube.com/watch?v=vWgH08tzaAs



basically i relate to 151 132 uh it's really up to you we have

students who are very successful uh in taking either order you can do 151 first

they say this semester and then do 152 next break will be offered next spring

or if you have done 132 in the past spring and then you can also take 151

they are related but with very different focus when they need to cover a lot of

more advanced topic in architecture a little bit more

higher level abstraction but more thinking about how virtual memory out of

order execution memory consistency cash flow

here is how those topics work but this class 151 251a is a little bit lower

level it's really about micro architecture and how we build digital

logic so this order is really up to you no i think you will be fine either way

i do want to mention the paypal class a lot of our students actually

uh um

take take for class after this one especially for students enrolled in this

semester in the fall because paypal class will be offered in the spring and

at least for now if you have actually taken 151 or 251a you meet the

prerequisite of the kpop class you can always go to the takeoff class and that

question is also growing i think past semester they have like four-day

students actually take part two trips actually in one semester very impressive

so if you're interested kpop class is definitely i would strongly recommend

especially for students currently enrolled in the fourth semester because

it works pretty well if you want to do that next spring

so that's 151 152 for students who are more on the circuit side who are really

interested in circuit 151 is digital uh circuit and the one forward is analog

circuit so if you have down both 151 and 140 you should basically be able to take

also advanced uh circuit uh here at berkeley or elsewhere so uh 151 some

students do 144 some students who won 51 first and then the 140. again the order

doesn't matter but you will be fine if you if you're interested i'll do 151 and

140 that will prepare you very well in general for circuit process

any questions um course sequence uh what's after this

uh prerequisite clear makes sense

okay good so that's the related questions uh we mentioned a lot earlier

uh the 61c uh prerequisite uh in particular one

thing it's very important for 61c uh is a risk five uh i say and the pipeline so

many of you you have takens if you wanna see or have done

like a basic intro to computer architecture before you probably see

this type of five-stage pipeline uh this one is not even pipelined right this is

actually a single cycle pipeline for a maps architecture here at berkeley we do

the risk five i will actually come from somewhere you may have seen uh the mix

mips architecture that's fine we'll basically do uh

in order uh maps a risk five uh 32-bit i say actually also in this class i will

be pipeline that will be basically the design you will implement in your

project uh if you already forgot a little bit

about this since you've taken 61c a while ago don't worry we'll catch you up

right we will have roughly i mentioned earlier one week a very quick refresher

just how this pipeline works what are the key components of i say

especially the rivers five i say it is very important especially risk 5 iso is

actually being very widely used today in industry

a lot of the time when we talk to our industry partners they come to berkeley

they like to hire our students because our students really understand the

response i say because the response i say is actually developed here at

berkeley so this is very important this will actually not only be very useful

for this class it will be actually very useful for your future

career so it's fine if you feel like you are a little bit rusty about this don't

worry we'll help you to actually have a very quick refresher how this works

we'll add also add a little bit flavor there to see a different aspect of rs5

icing so with that uh after this class i

mentioned earlier in 61c you basically use the largest and

a very high level simulator to actually simulate the hardware right so in this

class you will actually get to build uh the real hardware whatever you design no

matter whether you are in asex lab or rpg lab whatever you design are very

close to fabrication we could actually potentially pick your design and just

get it fabricated either intel or tsmc so your hardware is basically very close

to the real hardware that you will be using

like out of the shelf component so this is really getting real this class is all

about getting real you will actually build very

very powerful hardware through this class and especially if you're really

interested paypal classes right after this you can actually really get into

the takeout experience and see all the complexities and all the fun actually

involved in building hardware so with that uh that's a i guess the

scope of this class and some of the prerequisite things that we will do in

this class and next we'll talk a little bit more on the administrative side but

before i move on questions comments thoughts

so clear you already know question

the course number and your name is soham

the course number for the paper undergrad it will be 194 i believe and

if you guys uh basically a special topic class for grad students will be 290.

uh related to that so has a very important important question so we have

paypal class we also have typical class always in the spring we also have a

bring up class um actually i'm i'm not sure about the course number about the

bring up class but i'll get back to you folks

it is actually offered right now so basically we organize the courses now we

do tape out in the spring and by the end of spring semester we send our design to

currently we're using intel fab to intel and then after a couple a few months so

currently our trip are expected to come back in

october november so currently this semester we actually have a bring up

class our students actually work together to think about how we design

the boards how we actually get ready what things we want to test for the

check so there will actually be two courses related and again the sequence

is pretty flexible we have students who down the table first and then they do

the bring up so that they get to bring up their own trip we also still have

students who actually do the bring up class first so that they know what kind

of features will be very useful for bring up and then they do their uh their

check next semester again the sequence the order is very flexible but those are

two courses related to kpop good question

so there are a couple questions online with different differences in lab we'll

get to that when we talk about the lab components any other question

just general question

and your name is eric so eric asked by the prerequisite

for the tape on that bring up so it is still uh we are still

discussing about it because given the strong interest at least for now the

current rule is that you can either take 151 the digital logic design or 140 the

analog design so it will be either or 152 is not required uh so you can so

that's why i mentioned if you have this class you can actually do the paypal

design it will be better you will have taken multiple so you know both the

digital and analog component but during the paypal again with us we'll talk

about abstraction complexity it's all about divide and conquer so we will

actually divide the entire design into different modules if you have a more

digital background you will do the digital design you have more analog

background it will do the analog design so currently at least for this audience

if you have 150 one background you are ready

question and your name remember yeah this might be a stupid

question i noticed that square is a normal separate slide so i assume it's

something important to kind of complete a message well first there's no stupid

question and where is the square oh the feeling is

oh that's a that's a good question so we'll see actually later we'll talk

about the textbook so first there is no required textbook but there

i think two or three recommended textbooks and one of the textbook uh

this is basically the cover of a one of the textbook and that textbook is

basically written by uh two faculty here at uh at berkeley and one faculty at mit

so it's very on the circuit side i i'm actually not clear uh why they

picked this cover one thing i like this is i guess this is a little bit

uh abstractionish are you trying to see the

try to guess what this is but you don't have a good that you know i don't really

know my sense is that they pick this cover because it shows up i guess the

layer of abstractions related to hardware design but potentially this is

also just whoever writes the book their personal taste so we don't need to

overthink this but this is related to the textbook that's why we put this here

it looks like it does look like the chips you will see

a couple active pictures later you will see a different module even you look at

like m1 processor right you have the different coloring there so there are

different modules so it's also very chip like very hardware like good question

interesting observation and name and question

like if next um we enroll in the ac cloud without until next year

right um well good question okay uh we'll we'll get there the short answer

is yes and but we'll talk more about how that works okay already plenty of

questions about the course logistics so let's get there

well so first uh welcome the x 151-231-a fall 2022 teaching staff uh this is

actually the biggest teaching staff that i have ever had i think this is also the

largest in the course uh history we have 10 and gsi ugsi actually for

this class i i think we actually have five undergraduate science and the five

grads gsi's you will actually see both perspective for undergraduate science

they actually just they just take they took this class

either last semester or the semester before they got really interested they

really like they want to share your passion

share their passion for grad students they have a little bit more experience

that they will also able to actually share what they like this class and how

they see this class actually applied into their research will actually get

very different perspective so i would not go through uh go over their names i

also told them they don't need to come to class because they are very busy but

they are great i really like all of them so that's why i actually

recruited them under the onto the team and

we'll already have a lot of fun with such a big teaching staff will have a

lot more time to actually offer office hours labs get to help all of you at the

same time i also want to ask all of you to be a little bit more patient uh we

are trying to try our best to navigate this is the largest enrollment ever in

this course history we are trying to work out a lot of details but we are

very passionate we like this class we love really love this class we want to

help you this will be a fun semester but do bear with us there will be some ups

and downs but it will be fun we'll talk a little bit more but we'll have

four discussions i know some of you only saw three discussions but we recently

just added one more there will be four discussions and there will be 10 labs in

total 10 labs you are feel free to choose either asic or fpga we'll have

four basic labs and the sixth fpga so there

will be 10 labs so each of the gsta will lead one of the labs and we have four

uh grad students who will lead the discussion i'll talk a little bit more

about the details of the labs and um

uh and discussion in a minute and we'll also have undergrad reader chimney will

help us with homework uh greeting so this is a big team this is a big

class but it will be it will be really fun

um with a little bit more about course we

already briefly discussed this before the class starts all the course

information is on this website so bookmark this website everything there

we will not be using b cores so there's well nothing on b course just use this

website all the lectures uh

lecture i typically post the slides uh the day

before the lecture so it should be you'll want to see the content you

should be able to review it the day before i will also post recordings of

this class afterwards so if you miss a class or just want to

watch the class again you should be able to find the videos again on this link i

will also post problem set labs all the labs and related deadlines

will also be posted on the exam info some of you are having problems getting

enrolled on ad we already manually enrolled all of alistar currently

enrolled students you are on ad already you're currently not on uh

there's a link on the course website you can just enroll yourself you don't need

uh at me um

uh i mean uh a privilege to actually enroll you just

enroll yourself and we also have a lot of very useful

pointers past exams useful resources everything is on the course website

anything any questions about the course website or getting things enrolled

okay we'll talk a little bit more about the course organization but at the end

this is uh basically everything is on the course

website uh class organization uh it's very

colorful uh with everything going on you cannot see that is fine uh the slides

are posted basically that we have two uh lectures every week the yellow one are

basically the two lectures tuesday and thursday we have four discussions the

great ones are the discussions so monday tuesday

wednesday and friday you can go to any of the discussions i

know some of you are enrolled in a particular discussion that is fine but

you can go to any of the discussions you don't need to go to your enrolled ones

so anyone is fine

uh and uh again four uh asic labs i think the green is the

asic lab see where they are and the purple or blue purple is a fpga labs so

those are the labs there and the red are the office hours uh we have 10 staff so

we also try our best to have non-overlapping office uh our hours

here both office hours and the labs will be

in the first floor inquiry which basically we own that room all the class

activities will be actually happening in that room so you can always stop by

for discussions you should be able to find um

berkeley on the website we'll also post it

on our course website my office hour will be in in my office instead in the

in the lab that's the only exception but most of the activities is in the first

floor quarry

questions related to schedule

name and question

right that's a good question we'll talk a little bit more later uh we strongly

go to us recommend you don't need to go to your assigned lab but we strongly

recommend you stick to one of the lab because that will give you an

opportunity to know your whoever leading that lab know the gsi know the ta very

well and know also um know the fellow students very well and a lot of times

especially during your lab or during your project will debug we actually work

in teams and the final project will be actually it's not done solo we'll talk a

little bit more later it will be two person per project so you also want to

find a partner so you can go to any of those it doesn't

need to be the one that you're currently enrolled you can always go to onenote

lab but we do strongly recommend you stick to one last a lot because that

will help you in the long run but you don't have to go to the involvement

one of the discussion will be record well make sure at least

the discussion um we'll have four that will be of the same topic every week one

of the discussion will be recorded any other questions

it's it's really up i think it's up to cal

central whether you can actually get to get enrolled i think all the labs are

currently full i i think it's going to be

high risk at least to switch at this point so if you want to switch make sure

you have a spot uh we'll talk a little bit more i think i

see students actually do well in israel at the lab and i think some of you also

mentioned i think you mentioned earlier you can always actually take another lab

in the next semester so i don't see a huge difference between asic and fpga

lab so whichever works best for your schedule that you like most just go with

that i wouldn't try too hard just to switch

any other questions so i have a question which is regarding

the support discussion on friday do we know the room room location of that

right so we have the room so this question about the room for discussion

we will actually add also to the course calendar we know the rooms and we know

the exact room for the four discussion it will either show up on the class that

berkeley or will will definitely make it make sure it actually show up on our

course website so we'll post that another question regarding office hours

would it be hybrid

so office hours will largely be in person but if you want to actually have

a virtual office hour reach out to um whatever it's running that office hour

we will accommodate a virtual office hour but

overall it will largely be in person but if you have a special request will

accommodate thank you

uh lucy has a question for me

right so uh if so typical we'll talk a little bit maybe we can get back that

will talk about slip days uh in labs we'll talk about that

okay so this is uh overall organization we'll talk a little bit more about um

example we'll have one midterm and one final

in this semester we'll talk a little bit more when

they will be later

we'll also talk about textbook i saw a question about textbook here

uh so uh lectures i already mentioned um slides will be available and will also

report uh you can come to the lectures i like interactive lectures this is fun um

but if you i cannot join either virtually or in person feel free to just

watch the recording so all those things will be recorded

uh there was a question about uh textbooks there is no required textbook

for this class we do have some recommendations i will also link the

readings related to the textbook on the course website but generally again from

our conversation with students they find um the textbooks are potentially useful

but can also be a little bit overwhelming because sometimes they

actually organized in a different fashion so i would say slides and

discussions are the most important source of information if you really like

or interested you can actually get to see those textbooks but again are

not required and we have to have a newer version

of the digital design and computer architecture actually in risk five i

will also link that on the website so that's a newer version of this uh this

one is actually using maps but again no textbook is actually required for this

class and uh discussions uh we already talked

about this we added a new one uh on fridays uh again you don't need to you

can just go to any of them you don't need to actually switch your discussion

to go to the friday one you can always go to any of them

our first discussion will actually be next friday uh because this is really an

angel class there's nothing to really go over a discussion next monday so uh the

first discussion will always be every friday and after that the full

discussion will be on the same topic so you can actually go to any of them you

won't miss too much the first discussion of the week is actually friday so every

friday will have new material and the other three discussion will actually

reveal uh the topics that covered last week

we have some consistency of discussions

okay so discussion starts next friday

problem set we will roughly have attendant problem sets over semester

basically weekly problem set um typically will actually post on thursday

and due on friday it's um it's just a way to actually uh well i guess force

you to review the course material it's typically not too challenging or too

time consuming but we do strongly recommend you actually uh

review the material before you actually work on the homework to actually help

you understand um sleep days uh so for homework

problems that you will have a total of seven

uh slip days uh during the semester again we have that

we want to encourage you to finish all the homework so we will have sleep days

if you have other personal issues we'll have ways to have

additional extension but uh generally service database for homework and

after that 28 point per deduction per day

and for labs again you're you're strongly recommended to finish your lab

within one week some of the labs will actually have two weeks so that you have

a little bit more time to finish we will also have 14 one very generous i think

this is probably the highest one actually with all the courses that i'm

lawyer again we want you to finish the lab it is very important

at some time our lab can be time consuming but it's very important to

actually finish some to actually get ready for your final project so you will

have from my experience if you actually

really want to finish the lab using the slip days you will actually be able to

finish in the end so we are pretty flexible but

you have 14 sleep days and then the same policy 20 point deduction after all you

used all the sleep ticks for that questions

questions

yes yes for yeah homework in lecture and

your name is omar omar good question yes when i say

lectures basically sleep days for lecture means this for homework

make sense clear good to see you

okay okay laughs oh we talked already uh over here you folks have a lot of

questions so first choose either fpga lab or asic lab um

i will strongly recommend against you doing both

we do have some students in the past who managed to actually do both labs in one

semester basically that's basically the only

class they will be taking they are taking during that semester it is

very very happy and also you don't have to do that because you can always take a

lab in the next semester so choose one of them if you are

planning to actually do two make sure you talk to one of the teaching staff so

i will understand your load a little bit better and to see whether you can

actually finish all of that because it seems very easy at the very beginning

especially first couple laps but once the project starts that can be actually

very very time consuming right so uh again choose one of the labs you can

always come back and do another one but you don't need to actually try not

to do both at least that's a first rule of thumb

we'll have six laps for both fpga and the a6 lab

typically it's one week per lap for some of the longer ones we tend to actually

do two weeks per lap so you will have enough time to finish all the lab the

majority i would say 60 to 70 percent of students are

actually able to finish their lab in a week but if you're not able to do that

you always have sleep days so always try your best to finish your lab

uh and that those all the code all the designs you write for your lab will be

very useful for your final project so do not skip labs uh marco question

yeah i have a question so i see on the course catalog like it's

possible in the future if you want to do another lab uh you can take the lab

without taking the class so i'm actually kind of confused of how does that

process work like

if i choose to do that in the next semester like

uh what are the stuff i need to do what other stuff i don't need to do

right that's a good question so first this class is organized really as two

separate classes on cal central one is a three unit lecture you will enroll that

then also a discussion the other is two units lab so they actually operate as

two separate classes so if this is the first time you are taking this class

always do both you basically will have five units for this class three unit for

lecture and two units for the lab if you want to come back again to the lab you

just enroll in the two unit component and don't enroll in the three unit

component and that's basically how the enrollment works got it so

what about the exams and the in the project so

does the projects belong to the labs or projects belongs to the class

right that's a good question marco projects belong to the lab so we've got

it going your lab again we'll talk a little bit

grading later project belongs to the lab and project is a a huge component of the

lab yeah yeah got a guy thank you so much okay good question

uh how much overlap is everything the asic and fpga last one for the new ones

and the final question right and your name is easton okay good question so

there are some overlap uh in particular in both slabs you will actually learn

verilog basic that's a programming language that you will be using in your

design so that's the same for either of the lab you will learn that

for the project uh the end goal the end design

is the same you will be actually designing a pipeline a three-stage pi

risk five pipeline so the design component is the same the tooling are

different so for fpga you will be actually using the fpga synthesis and

simulation tools well for asic you'll be using a different set of asic tools so

that's a key component but the differences can be pretty pronounced

because we'll actually cover different ways and different ways of using the

tools different ways understanding the tools different ways to interpret the

report because the underlying hardware substrates are different so that

differences of going through the design especially getting a clean design is

significant enough that's why we are strongly recommend not taking at the

same time but in the real scenario if you're doing both

the very loud code you are using for both lives can be shared

yeah okay

clear with labs okay good the labs are very

important and the labs start next week next monday so discussions are friday

but the labs i think there is a lab on monday and that picture lab on tuesday

so last start next week so beginning of next week well whichever lab works best

for your schedule i'll go to that lab so lab starts next week

the midterm and finals so we'll have one midterm and one final for this class

we'll always have review sessions there for midterm is still being scheduled but

likely it will be either the last week or second to the last week of october uh

it will be seven to nine pm so it will be scheduled by the department to avoid

overlapping with other x-forces so that will be the midterm and the

final is basically scheduled by health central this is our

final uh slot we are now playing and i got a lot of

questions already um we are now planning to

offer alternative midterm or final especially finals we'll talk about the

clobber policy later if you cannot make midterm

your score can be propered by your final we're currently discussing

opportunities for students to take especially finals

right after the scheduled slot to avoid the management

hazards but also accommodate most of the students so that's been discussed we'll

discuss this uh officially next week during our staff

meeting and we'll get back to that but as a guideline other than that we are

now planning to offer alternative uh midterm and finals so do factor that

when you think about your schedule this semester

uh the finals will be a closed book uh both both examine midterm and the final

will be closed book you will be able to bring one note of

one page of note you can write anything there so

it's open notes but close book

any questions i have a question regarding bsp

accommodation so

i wonder if you receive false csv layers of accommodation

and i'm i'm one of them with exam accommodation extended time

so how would that work right right yes a good question so we'll

handle dsp accommodation case by case and

uh if the dsp accommodation specifies extended time we will also offer

extended time for for exams so it will be handled case by case

and where to find an exam alright allowed to use only one or more or two

cheat sheets uh see that again

or for the final are allowed to use only one or more than one

one p cheap uh uh for final you will be allowed

using two so you can bring your mid one and you can write a new one yeah

so you don't need to repeat what you already have for the mid term so just

bring me term one and uh and write a new one

thank you good question

okay as i already briefly mentioned clover uh so something that couldn't

make midterm it's um it's fine we will specify regions of the finals um

that actually cover the midterm topic and

you can always clobber your midterm if you actually get higher scores

in that part of the finals um if you actually take the midterm it's

the same you can always overwrite your midterm score with uh with finals

um by the reverse you always need to finish the entire finals just there is

opportunity to overwrite your midterm cover

uh let's see of course so we will actually use add discussion uh for all

the discussions uh you should be able to enroll yourself directly just follow the

link on the course website our staff uh enrolled i guess at least the majority

of the students but if you're not currently enrolled i just follow the

link you should be able to enroll yourself

and finally um order code i don't want to spend too much about it i'll talk a

little bit more later but i think one thing fun with digital design i mean it

is engineering but it also i guess um uh your name is

november yes okay i remember mentioned like like the art like we showed

actually earlier the cover right it's also a form of art i i see a lot of

designs every students use the response isa but then once we actually come to

the final design there is a very strong personal personal taste actually

embedded into the design even everyone is doing a response i say you may

actually get into very different designs because this is an opportunity to really

create to embed your personal personality into the design itself right

so there's really no need to copy to cheat it doesn't make sense

because you create something so unique it belongs to you you want to put

everything your thoughts your what you like most what component you want to

design what you think would help with the design process actually into into

your design right so there's no reason which you are creating something so

unique to yourself right why would you want to copy someone else code is just

it's not yours so this is uh this is class really all about you you design

things that you like you feel passionate about there's no need to copy others

you're creating something very unique only only for yourself

so definitely do that and

reading already mentioned earlier so lecture and labs will be graded

separately so in the end you will get two

two scores one for the three units lecture the other for the two units lab

for lecture it will be largely graded by final midterm and homework problem set

for labs it will be graded based on the six laps we mentioned earlier and the

final project so that's how the printing is done

questions about information

right so the question is whether this class is curved this class is not curved

so we will basically you are not competing with your fellow students

especially for folks who are actually showing up in this class i assume all of

you is like 61cc material are interested in know more about hardware and system

so this class doesn't have a particular curve it's really based on your design

your effort how could you perform in either classes

in final in exams or your final project we will have certain beings um every

every semester and that being uh again every semester is different so i will

actually do some shifting every semester that will be basically how we great but

it's not we don't have a particular curve in mind is really how good

students perform

good question

yeah i set a question on the

yeah a good question and your name is ryan and i miss your name

darwin darwin okay adorable hustle about the

curve and the orion so they are

related but largely i would say orthogonal you will see some verb log

questions showing up uh in also lectures because we also

cover verilog and we also want to test students on verilog you'll also see a

lot of pipeline questions showing up in exams in lectures because that's also a

key component of the micro architecture um but that's probably the largest

overlap you will see uh the two classes there's some material will be covered

but the three units and two units will be created separately

with overlap contents

okay well since we're talking about grading uh how to actually get a good

good grade i mentioned earlier we're not following

any particular curve the lecture i would say is not too hard if you are here no

matter whether your class is or undergrad

you are already doing very well all right that's why you are here you really

want to challenge yourself in some sense right that's why you're here so lectures

is not really challenging if you just follow the lecture again attend the

lecture um follow the pace i follow the topics do the homework i think it will

be doing pretty well i would typically students when students actually couldn't

do it very well in the lectures like they have something coming up they just

don't come to lecture for months and then they try to catch up that's very

hard especially for this class because we're moving very fast we'll cover a

range of different topics it's very hard to catch up but if you follow our

schedule follow come to lectures or watch the lectures regularly hold up do

the homework uh review the material i think it will be fine typically students

will do okay um most students majority of students will do actually okay a lot

of a lot of you folks would actually very well in this class so i wouldn't

worry too much about the lecture just to make sure you follow our schedule

as a lab is very very very very very very

repeat very multiple hundreds of times very important take

that very seriously that's the most important part of the class you will

spend a lot of time especially towards the end of semester on your project so

this is very uh important uh i would say this is lab is actually the most

important part you will learn the different topics but the lab and

projects where you actually get opportunity to see the implications of

different components of hardware design so they are very important

i mentioned earlier for the final project i will have two

person team sometimes we also have solo team that's

a possibility but in general it's just because of the load uh it's two person

to project per project i always tell my students um

also a student in this class choose your project partner very carefully of course

the same applies when you choose your life partner but to your project partner

very very carefully because you will actually spend

a lot of times especially towards the end of the semester actually working

together talking together coding together

having like having lunch having dinner every spending a lot of time together

making sure you find someone you like you want to spend time with them and

that will help you a lot actually to have a very smooth semester so that's

another reason stick to one of the uh the left and one of the labs so you can

actually really get to know the students what their their stress what are their

weaknesses and whether you two can actually work together on the project so

partner is very important

one thing you'll see actually in the lab is that you'll get a lot of opportunity

to experiment a project management actually

in this in this class it's a very it's a very big project it pers uh uh i

think the project that we do here is probably the biggest in at least

undergrad education in in x department so it's fairly complex

you really need to think about how you break down

the big project into different components we will help you uh trying to

break it down we'll have different checkpoints um the reason we're doing

checkpoints basically trying to break down the complexity so that's very

important be very well organized again follow the schedule

uh for both projects and also a lecture we organize this class this way so that

it actually works best uh you can actually continue making progress but

not feeling too overwhelmed right so being very organized follow the fuller

schedule i will approach the design think about abstraction think about

modularity always add a little bit of complexity at a time right always do

testing always have a working design that's very very important and sometimes

you do need to actually restart you will realize you actually come to a dead end

don't be afraid of doing that don't try to avoid that if you have to do that do

that because you eventually you actually want to skip

a divine in the end so that's always

very important so if anything take aways the labs are very

very important spend time there that's a very important component of the class

and the question online support for lab yes so there will be online support uh

we will also have i will the gsi will basically have a zoom session open but

again it's better to get the opportunity to actually interact students in the lab

but if you cannot be in the lab that's fine just let the gsi or undergraduate

site know so that they can actually um they have a zoom session ready and

you can actually talk to them so there will be some online support as

well

okay just to get things started i mentioned labs start next week next

monday so discussion starts next friday and we have a new discussion so feel

free to go whichever works best the lab start next monday uh we'll have our

first homework assigned next thursday and the due the friday after that if

you're not on ads do that as soon as possible and once you get your lab

started you will actually need to look at an

instructional silver account so that's all the course logistics

any questions comments thoughts

uh uh like anthony i'll get back to you in a minute uh lucy

that's a good question so lucy i guess you're wondering like i said i i asked i

told you a book just how to get a good grade right i guess lucy is wondering

how how to get a bad grade on the other side

of the of the question so um what are the typical pitfalls um i

guess a couple of a couple i guess um very common examples

um some students missed a couple labs so we have six left not that many and we

actually have plenty of slip days all of this to actually force you to finish all

the labs well they are very important we have students who just

get into the middle semester who cannot actually do a couple of the labs and

that's basically it's not just a lab itself but the lab will also help you

practice your wear log skills understand different modules and how things

actually connected right so don't miss the labs so if you can

i know things happen so that's why we have plenty of sleep days but if you can

do every lap right so once if you actually miss one of them you may

actually have not have enough motivation actually to actually finish the bigger

project so don't miss labs um you have you have the support system we have

plenty of office hours lots of questions get all the labs you need right don't

miss labs so that's very important second specific

to project that's also like related project

management once we get started you will see that we actually have three or four

checkpoints that actually spread out roughly every

two weeks again similarly to the lab don't miss checkpoints that's also also

another way to actually get you on schedule and you will also get a lot of

support if you are actually on the checkpoint the gsi will help you to

understand what are the challenges your fellow students will also be able to

help you right but if you are fall too far behind it's just very hard to help

because everything is actually moved forward so those are the two common

things that i see students who actually struggle in the lab it's again it's not

something like um uh it's it's never to the case that

they're not intelligent enough they're not smart every one of you here are so

smart you will actually be able to finish all the labs project without any

problem a lot of time it's just your schedule time management whether you

actually miss a couple of things that's going to be very hard to catch up right

so always follow the schedule follow the structure that we put together that's

the best way to actually move forward

right i see what you mean yeah so typically it's basically towards the end

what we see a lot is um

it's less about finders so sometimes when we start we like to think about the

binary choices it's all i i couldn't finish the project i don't get anything

or i finish the project i get full credit it's not like that i mentioned

this is a very personal process uh even you when you look at the end design

majority of students actually finish all their design look very different

actually you will actually very hard to see two identical designs in the end so

students finish their project in their own way there's not not like a standard

way you have to finish like this we have a specification there but students

finish the project in their own way we actually get very different designs and

we'll talk a little bit more we also have um design competition in the end

whoever gets actually have a set of awards that will be given to students

who actually get the best design in the end but

eventually for students who completes uh the project you'll get a design in the

end um some perform better some perform worse but you will get the design that's

basically when we say completion uh it's never like a binary like oh it's not not

like oh my design is not as good as um as like the spec then you basically get

nothing no it's not like that if you have a design

functional will create it based on your your design how well it perform but

we are not expecting a uniform solution across all the designs

question yeah grinders yeah

so it depends i believe for asic lab typically we actually have some

questions that you actually need to write write down think about write down

and submit uh almost for every lab for fpga lab

probably only the first couple there are some written questions you need to you

need to read the the specs the document and that product is largely uh check up

so it's a combination yeah question

so rough so and your name is alex

alex asking about the timing for project it will be roughly basically the second

half of semester you'll have six seven weeks so once we get all the labs done

we'll as projects started yeah six seven weeks

[Music]

so yeah good question lab is done solo so all the labs are solo projects are in

partner question over there

yeah so the lecture will be largely the same the design the final project design

will be uh slightly different that one 251a will have another additional

components that need to be designed so but the lectures will be lecture will be

the same for exams and homework we may have a

couple more questions for the 251a students so for the grad students here

um many of you have already seen these topics before so this is again more like

a review for grad students again labs are very

important this will be a good opportunity to get familiar with

berkeley infrastructure close to i think majority uh i think both asic and fpga

just see the infrastructure see the flow that will be basically the most

important takeaways for grad students or some of the graduates haven't seen

the risk fight i say this is a good chance to have opportunity to catch up

but for grad students um this will be more like a reveal review

class but also get to know the infrastructure a little bit better so

that you are better prepared to navigate the research here

okay any other questions okay everything clear that is clear so

far um again

if you have questions um post your questions on ad that's always the

fastest way the best way to get response all the teaching staffs i'm monitoring

that uh emails will actually be slower so add because you will

post your questions on add discussion that will be a lot faster because

everyone can see that

okay i think we cover also the questions um

online any questions online um i

i was going to ask about the discussion are they only in person or

is not an option available right so so we have four discussions uh

four discussions upward discussion will be in person one arrest every week uh

one of the discussions will be recorded so you will always be be able to see

that uh to at least review one of the discussions

i mean no discussion in the chat that says are

there great bins or just typical percentages for grades

are the great beans or just typical percent they're great we will have great

beans i mentioned earlier and there's no typical percentage every semester is

different so we'll grade it by by semester it will bring them differently

one thing i always tell students is if you show up here no matter grad

students or undergrads i wouldn't worry too much about grades again this class

is pretty self-selecting in the sense you show up because you like this kind

of topic i assume you also at least enjoy i like 61c before you show up here

so it doesn't make sense to have a particular curve uh for this class so

we're fairly flexible but just follow the schedule don't worry too much

otherwise it will i think it will work out overall in the end

okay a lot about the course already i mentioned earlier ad is a very useful

way to connect it with other fellow students and also the teaching staff

so with that we're going to talk a little bit more of the the bigger

picture i think we'll get to the details very quickly next next week but it will

be fun to just talk a little bit more about the the history and the different

perspectives when we come to hardware design especially digital

hardware design you probably already see

different version of this either in other classes or

or in the news and guess semiconductor is a very hot topic these days in the

news so uh this will be a good way to see how

different things are connected and how especially this class we talk about

digital design and integrate circuit how we actually approach

uh different components so one thing with this class especially

hardware design people tend to think about hardware design as a independent

topic on its own but hardware design is always very connected

with software with applications when we see actually different waves of

applications different ways of focusing in the past really past decades they are

either driven by hardware because the hardware advances the hardware is faster

we're able to actually run different applications in extremely

either low power devices or data center devices

or they actually motivate the hardware design to do slightly different things

many of you probably also see a lot of machine learning accelerators video

transcoding accelerators genomic accelerator all the different

specialized hardware being developed they are also driven by application so

we see hardware as an isolated area but a lot of hardware development they're

either motivating and they are actually helping

all the different applications to actually get widely adopted run faster

or those applications actually change the way we actually design hardware

especially more recently when we talk about what we

call domain specific hardware all of those are actually very application

related where we really need to actually understand the connection between

hardware and applications so even when we think about hardware there is a very

strong connection with application and the different ways different types of

applications always very important when you think about hardware

and when we think about hardware typically especially in this class when

you actually interact with either your fpga board or

your asex flow you like to think about this low this low power embedded system

but another very important style of design is also data centers so a lot of

work that we're doing especially on the research and it's really thinking about

how we actually accommodate different needs

of hardware design so that we can actually design different flavors so

when we think about we talk about application that drives a different way

of thinking about hardware design there's also different deployment

scenarios whether this is actually deployed as a mobile device as an

embedded system device or as a cloud hardware that will also change the way

we actually design hardware so this is a fairly complex design very complex

market it's there's nothing really universal i mentioned in your design you

will actually add your personality to your design nothing exactly the same so

i actually designed for different market those different market segments also

impact the design choices very significantly so one thing with hardware

design is it's not an isolated area you'll need to understand application

you also need to understand some kind of the market dynamics what kind of things

are important how they are actually driving different flavor

hardware design that's really what i like about hardware design the most it's

not an isolated area you see all the connections with the entire stack and

also different driving uh different driving markets

different use cases so that's really cool about hardware isn't it

we talked about those exciting opportunities right how did we actually

i'll get there where this all start

it's um it's really in some sense surprising i think this is the only area

you look at the semiconductor industry it's not it doesn't have that long

history right we look at the first transistor this is basically uh uh

designed in i guess 1947 roughly i guess 70 years it's still less than 100 years

right so everything happens really quickly first we have the first uh

individual transistor and roughly a decade later we are able to actually

combine a simple multiple of them into actually integrated circuits not very

complex there's a couple transistors but we're able to design them together in a

actually systematic way and maybe another 10 years actually from

this we are really talking about how we can actually build a bigger more complex

and also more scalable system so everything every decade we are actually

making very major technology advances to think about hardware device there's no

industry like this semiconductor is very unique people are pushing ourselves

really hard so that we can actually deliver this kind of performance these

advances almost every year we are looking at new things every year uh

some of you actually were watching hot trips in the pa we'll talk more about

hardships announcement throughout the semester every year we have new hardware

being designed a new hardware being introduced every semiconductor company

is trying very hard very hard to have some new product announced every year

and to actually match certain performance advances that's very unique

to the semiconductor industry we are an industry that we actually push ourselves

really hard in a good or bad way but today a lot of times we think about the

way we advance technology you may also

hear this a lot about moore's law and the way we actually think about

integrated circuit that we actually want to double the number of transistors

during certain time frame and this law largely set basically the pace of the

semiconductor industry how we attribute the bigger more complex processors over

a year we'll talk a little bit more but one

thing people always misunderstood with moore's law is that we always think it's

actually a transistor scaling law right talking about the density of the

transistors but more so it's really talking about the cost

how we can actually reduce the cost so that with the same budget we can

actually fabricate more transistors again people have different

understandings of moore's law you may hear people even you know saying either

morsel is dead most likes alive many cases they're talking about the

same thing but from different perspective

if you're more only from the density perspective we'll see a little bit more

warsaw is still there in the sense that we're getting more transistors every

year every generation but you're coming from the cost perspective where the

transistor cost is actually not growing down it's not going down so that expect

more islam is not there anymore so that's why people also say moore's law

is death because we're not getting cheaper transistors

we'll see a little bit more uh very very soon but when we actually think about

horus law i mentioned earlier a lot of times we

were thinking about the density right transistor per unit area so that has

been actually going up pretty consistently we are seeing this

specifically uh exponential growth over the past five

six decades where we always have more complex newer hardware

and specifically uh this is uh uh plastering from tsmc a couple years at

hot trips and this year i have tripp's intel ceo paul kessinger also show an

updated version of this also showing also showing

transistor density and if you're purely coming from a cost

as a purely coming from the density of a transistor it is actually still going up

we're still getting more transistors each individual transistor is slightly

smaller so we have a slightly higher density every year so that's a good

aspect that's what people call it's still a live aspect of moore's law

and even in our project in the course history i mentioned this is one of the

highest enrollment in the course history right but even if you think about the

complexity of the board that we're using we also have our own moore's law that

every board that we're using a lot more complex a lot more powerful that's why

we can actually do a lot of very cool things we can actually design

um almost a fully functional result processor actually by the end of the

semester but what's not a lie what's not there

anymore and that's why so many different discussions um different investments

different opportunities different funding and different policy is

semiconductor industry is getting really complex in a way

for good or bad it's really about the concerns of

whether we can sustain the growth uh or the reduction of the cost in uh

indicating the moore's law so very core component of moore's law is

actually the cost per transistor is actually going down so with that with

the same budget we can actually afford more transistors so there's always a

cost component and that has been actually staying mostly cool in the past

after five or six decades we're seeing the transistor cost is also going down

that's why we can actually afford more transistors every generation

but that's not true anymore so if you specifically look at the cost aspect so

that's why semiconductor industry is not only about the technology of course we

have we talk about technology side right the transistor still going back

but again there's a strong cost component when we think about

semiconductor we always need to think about whether we can still afford that

many transistors in every generation of hardware

this this is from alisa ceo of amd as she releases a couple

years later if you look at every generation nvidia also released similar

uh version of this a few years ago and more recently there are also more

updated updated trend but in general it follows

this trend uh if you follow the news you may hear all the different nodes

basically the size or transistor different nanometer different size

residual transistor as we get smaller get to seven or five or three the cost

per transistor is actually not going down it's actually going up so it's

actually a lot more expensive these days at p2

fabricate large undisturbed to build large system

some system you heard about triplet about 3d integration a lot of those also

motivated by the cost component how we can actually minimize or reduce the cost

but still build a larger system so of course moore's law is very

related uh very important in this industry but i do want to bring you the

cost aspect of northside in the semiconductor industry what brought what

really breaks moore's law is not the transistor density that part is still

scaling but what really breaks more so is this the cost is not going down and

the question is how we can still build new designs and roughly

the same price but still get more performance hardware

i was surprised when we get when i got my new macbook pro this semester uh last

semester how expensive it is this day the hardware actually getting very

expensive so that's another side of the slowdown is the adam warsaw

we are observing compared to the macbook pro that i was getting like 10

years ago is getting actually the price is actually a lot higher so even the end

customer we already see some aspect of that so so the cost aspect uh not the

technology related but the cost aspect is actually very important component of

moore's law in addition with moore's uh generally

semiconductor industry is rooted by two laws one is moore's law the other is

then thinner's law or standard scaling so this law is a lot more technical so

this really tells us how we actually scale down the transistor while

maintaining actually the same roughly the same

power budget so this is really telling us specify the roadmap for transistor

skating and one is one thing for moore's law so we can actually afford more

transistors but then our skating actually tells us how we can actually

make smaller transistor and actually getting higher frequency

lower power and roughly the same hard density so

that's really that's really fundamentally support the technology

side of moore's law how we actually go through generation by generation and

deliver better products so that's why we mentioned that in the past decades

because especially 10 years ago when we think

about semiconductor industries always every two years a faster processor

roughly like a slightly higher power not too significant

it's roughly the same price so that let's actually make it possible but we

can always get the new processor new laptop every year but that part is not

there anymore i will not go through this field three feel free to go through the

vendor skating table it is actually just go through that derive that on your own

and understand why this is very important for the semiconductor

industry and the trend roughly

follow dinner scaling we see again the frequency gets faster

we don't talk about frequency anymore every product announcement is so boring

these days it's just oh single thread multi-thread

performance a bigger cache it's all about that but if you like three years

ago 20 years ago oh another freaking higher frequency one gigahertz two

gigahertz that's really that was really exciting that's what people were looking

for now unless you go to ibm still do some higher frequency stuff it's like

frequency roughly let's say let's actually look at single thread

performance and performance per watt so we're actually looking at the details

anymore now to the high frequency low frequency stuff but in the past in the

majority of time frequency has been roughly actually going up we'll get

faster processors and the power actually also go up with

mission power can still go down but people are greedy right the same power

density but we want to have bigger processor bigger chip right so every

year chips are bigger the power is actually still going up but before

it was manageable and then until it's not manageable

anymore so those are also very important to

trend um many of you see this a lot more many

times i will not go through that but basically

when it hits the problem that we can now scale

we cannot scale frequency anymore it's basically plateaus power is also

plateaued the the way we actually sell more processors deliver higher

performance basically by adding number of cores right so that's one thing you

will see in today's announcement more course big course small course uh big

middle small course right all the different course are being introduced so

that's another differentiation factor very important and we'll see a little

bit more especially after 2015 is the number of

cores also number of accelerators not only big

little small anymore people are talking about oh i have this neural engine there

i have this encryption there i have this video transcoding there so today's uh

new product announcement is very fun to watch

so many small corner things actually being brought up and everyone say we are

different we're better but they are all better in different dimensions it's

actually a lot harder to navigate before it's very simple what's your frequency

and let me see your frequency but now you actually need to see all the

different aspects but that's also the fun part right so many new ways to

actually innovate in this industry so a lot more things in this industry a

good time to do uh to get involved in this business

another thing one final note i would like to actually mention uh and we'll

see a lot throughout this class is really

the design cost the design complexity we haven't seen a lot we

won't discuss this too much but uh in 152 and also other

special topic class we'll actually see this a lot when we actually see the

hardware dissolved development we talked about

the cost is actually growing higher but one thing you will actually see is that

not the hardware cost not the prototype the physical design cost

verification software uh those are actually very

important that's actually get a lot harder with all the different

complexities in today's semiconductor so those costs are also very

important and that's a key component that's driving a lot of research today

and to reduce those costs a lot of things that we do is basically through a

layer of abstractions we'll talk a lot more about layer abstraction next

semester sorry next lecture not next semester i mean i'll see you folks next

time next lecture so we'll skip this i wouldn't i don't want to rush this we'll

talk a lot more about the design abstraction and how we navigate the

design through process next week next tuesday but yeah very important

uh part of your design one note i want to leave you always hardware design is

really a form of art it's very personal you will get to design your own hardware

in this semester and that will be fun i'm looking forward to interacting with

all of you take care
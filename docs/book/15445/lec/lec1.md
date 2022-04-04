# Lecture #01: Course Introduction and the Relational Model

这是一门关于如何构建 dbms 的课，而非如何使用 dbms 来搭建应用程序。这门课专注于关系型数据库。

DBMS 的不同部分：关系型数据，存储，执行，并发控制，恢复，分布式数据库，其他。

1. 存储：数据是怎么存在内存和磁盘中的。
2. 执行：查询执行以及如何更新数据，存储数据和检索数据。
3. 并发控制：当多个程序同时访问数据库该如何管理。
4. 恢复：数据库崩溃了如何恢复，如何保证数据的安全性和持久性。
5. 分布式数据库和一些其他的高级话题。


our database in um just a comment comma separated value csv file um kind of where each

each row or line in the file represents one

you know data entity so an artist or an album and

kind of each column is going to represent

a um uh an individual attribute about that

entity so

um you know pretend we don't know anything

about any kind of you know database management systems that are out there

like mysql postgre oracle sqlite any of that stuff um

jen we don't know about that we're just kind of building an application up

ourselves and what this is going to require is

that the application needs to

parse the file each time it wants to read anything and it's going to have to

read align split the csp um and kind of figure out what's going

on every single time we want to access the data so

um again here's here's just a simple

example using the um music store where we have two essentially tables stored as

csv files so there's the artist table where we have

the the name of the artist the year they first started

releasing music in the country they're from

and in this uh second album table

um we have the the name of the album the

artist that released it and the year it was uh released

so now let's say that that we want to issue

essentially a query on on the data that we have and we want to know the year

that ice cube went solo all right you know the

ice cube had had some uh disagreements about the amount of money he was making

so he decided to go solo and start releasing homes on his own so

um i guess the the the way that we would do

this we have the csv files is um we write you know you write some kind of

like a python program to look something like this

where uh essentially you open up the file and then you iterate over every

line and file take the line remember it's just a csv

string you have to parse it into a record and then we want to do is check

if

the value at position zero in the record is ice cube because we're looking for

one ice cube when solo and uh you want to print out

the uh the year so we're gonna cast the um

the second value of the string into an int and return that

so i i guess what's the problem with this it seems

pretty simple pretty straightforward um

i mean i guess your your query could change maybe you want to know when

the tourist big went so low um or started releasing music you could

uh just swap out the ice cube for

for a different name and get a different result or if you want to know the

country that someone's from um just change the

position that you're printing out there so i

guess this seems fine um but can anyone think

of you know any issues that might come up if if you're managing things this way

uh that is true so if um the the data gets really large then what you're going

to have to do is kind of open the file and iterate over all of the uh

the the lines here i guess what you could do is uh modify this a little bit

to as soon as you know that there's only one

record you're looking for in this case you could modify it a little bit to just

return as soon as you find it but that's

certainly true if if you're if you're not careful with

how you code this then you might end up

iterating over every single line in the file every single time

uh that is another problem that can come up so that the um

statement was that there could be a

duplicate entries for ice cube and there's no way to ensure

um using this method that uh um someone doesn't come in and you know put

in another record uh for ice cubes then we there's no way

to maintain kind of the um the

invariant we want only one record to represent ice cream yes

that's another problem any others

i have a whole list i can go through okay so

uh the first problem um or the first a series of problems

relates to uh uh data integrity so

one problem might be is how do we ensure that the artist is the name

the name of the artist is the same for each

album entry so if you remember um in order to figure out you know kind

of which artists have released which albums we

store the artist name in the album uh csv file so

um imagine that that you know you

type in a wrong a wrong name to update one of the the uh album

rose or um you know an artist changes their name

or uh that sort of thing so how do you

ensure that there's consistency between the name that an artist lists

in the artist's

file and the name that the artist lists in the albums file

another problem that come up is you know what if someone

overwrites the album

year um in the the album file within invalid

string so in that code i showed you you're

expecting an integer um that that represents a year when

um the album was released someone comes in

and puts in just a regular string um then your your code's going to break

there's going to be a problem parsing and again there's no kind of i guess you

could have access control on your files but you know once someone's able to get

in the file you can just make a mistake put in an invalid value for a particular

field

uh what if there are multiple artists on an album so

uh everything i showed um you know each each album only on an individual artist

so it's just one um field in the cfd string but

you know imagine that there's a

multiple artists on a

in that case i guess you know you could um

change the format instead of being a single string you could put you know a

comma separated list inside the field of the csv file but then

you're you know complicating your parsing code you have

to go back and adjust your parsing code to now handle um you know potentially

one or more values in that field

and kind of the last problem and these are just a few that i you know

came up with here but there are many many more but

what happens if we delete an artist that has albums so imagine that you know you

deleted the record for um

ice cube in the artist

file and now he has a bunch of records or a bunch of

records representing albums in the album table and now there there's no

uh artist remaining that they linked to

okay so that's kind of the data integrity side uh from an

information implementation perspective and uh this was

one of the points made is how do you find a particular error so again in the

example you end up in the code that i showed

iterating through every single row every single time

um you want to find something and you you

there are all sorts of ways to optimize it for example if you know the data is

sorted you could do like binary search or something

or if you have a data structure that stores

it maybe like a hash table or something you could

index directly to

the the record you're looking for but just you know all of these things you're

building up additional complexity in your python program that you have to

write um to access the code so

uh all of that kind of implementation efficiency needs to be taken into

consideration when when you're designing your application

similarly what if we want to create a new application that uses the same

database so the database is stored in the csv files imagine that you know

someone else for some other purpose wants to come along and access the same

csv files concurrently do you want them to have to

rewrite kind of all the python code that you've had built up

or maybe you need to do it in a different language

but the point is that kind of you've you've had to do

uh the work to build up uh this application

and now it has to be replicated every time someone else wants to access the

same data and even for you um you know like i said if you want to change the

query or or [Music]

change change things that you're looking for

you run into the problem of having to kind of re-implement things from scratch

every single time so um kind of another implementation

question is what if two threads or two programs i try to

write to the the file at the same time you know if i'm editing five and you're

editing the file um we both save our work

um who knows what's gonna happen uh you

know one of us might uh override the other or uh maybe both of our rights get

partially written and now you have kind of this garbage

record in there so what you can end up with is um

kind of all of this you have to implement some kind of

concurrency layer uh to manage the current accesses to

the data so the final piece um that i want to

talk about is his durability which means like what happens

if the machine crashes when when the program is updating records so you're

doing right um

power goes out or something or the your program crashes and

you know now what happens to the data is inconsistent

did you finish writing the whole record you wanted to write or um is it kind of

uh half written now you have again this is

garbage value um

in your your database what if we want to replicate the

database on multiple machines so we can have high availability

how do we handle kind of concurrent rights to different machines

because now the machines need to be synchronized across them and kind of the

list goes on and on and on uh with all of these problems that can come up

so that's kind of the the reason why we want to build a database management

system so we don't have to handle all of this complexity all those different

types of problems that i mentioned in application code

okay so i explain what a database is the software that manages database

is a database management system

sometimes people use the words interchangeably i will try not to

because it's diffusing but a database management

system or dbms is a system the software that manages

um the database and allows applications uh

to store retrieve and analyze information that's

that's stored in the database so rather than managing things in these

csv files you can access them through the database and it

kind of gives you all of these nice properties

that avoid the problems that i mentioned before

and a general purpose dbms is designed to allow you to

uh define create query update and

administer uh databases

uh in in a generic sense so if you have again an application for managing

students in a class or for managing

an online music store kind of it's it's general purpose enough

that you can program your applications um

against the system so this is really good for

uh like business reasons for your business or startup or

your organization because the purpose of the value add that you're bringing is

not that you can store data lots of people

can store data but um what what a

database management system allows you to do is focus on you know the core aspect

of your business rather than worrying about all of these um

issues surrounding actually managing the data and you know dbmss are are widely

tested and deployed um so that they you know find all the

bugs the concurrency bugs the consistency bugs all those problems that

come up because kind of you know the the chances

that that every single python program that you write is going to be 100 bug

free all the time pretty much zero

so um kind of the the the whole point of a

database management system is that you can leverage kind of this this core set

of functionality um for managing databases so you don't

have to do it manually in application curve

so i database management systems are not new

the first one i came out of 1965 at general electric was called idm

and essentially um

[Music] they were they were used kind of to

manage data but they were really uh writing applications um they were really

difficult to build and maintain

and that's because people were working at a very low level and there was you

know really tight coupling between um the logical layer so kind of the the

data model there and the physical layer that like the implementation

writing to disk recruiting things from desk query and that kind of stuff

um so

kind of the the the big problem is that you had to know the the queries that you

wanted your application to execute before you

deployed the database and they were just really cumbersome and not

not easy to work with so um kind of the things that we're going

to talk about over the course of the semester

um might seem obvious in retrospect but at the time uh you know people were

struggling to build these applications and and they were kind of controversial

the ideas were kind of controversial so there was this guy um at ibm named ted

codd it's him

who kind of observed that people were were reimplementing the same things over

and over again reinventing the wheel um and and you know making a lot of

mistakes uh uh along the way so he proposed kind of this this uh high-level

idea called a relational model and there's this original uh i think it came

out as a technical report in 1969 but nobody uh reads this one

this is the one that everyone references came out a year later in 1970

um it's a paper called a relational model

of data for large shared data banks um

and you know it's old because uh people uh

when they write the text they spelled data and base as two

separate words now you have it uh combined as one but

um kind of the the core idea that he proposed

um was the relational model and he actually

uh won the turin award in uh 1981 if you know what that is um it's like uh the

people call it the nobel prize for computing it's like the highest

honor you can receive in computer science and he he uh he won it for um

the relational model and as i said it was kind of

um controversial at the time i mean you can

look at it now and say oh yeah sure that makes sense but

at the time it wasn't so obvious so kind of the

relational model at a high level is a database abstraction to avoid a lot of

low level maintenance and problems that people are running

into writing database application so

uh the the the kind of three main points um that

they're gonna touch on are the

the databases database databases should be stored in a simple data structure

called relation

where a relation essentially represents uh the relationship

among attributes stored in the table so like the

relationship if you are thinking about the the uh artist

example um the relationship between the artist

name um the the year

uh that they that they started producing music and the country their first the

relationship between those advocates kind of the the next piece is that

you thought you should access data through a high-level language

rather than kind of telling the database your database

management system explicitly how how you wanted to get the data um you

could just specify what data you wanted and let the database management system

figure out kind of the best strategy to do it

because you know if you're building a piece of software

that's specialized interactive databases you should it should be pretty uh good

at figuring out the best way to get you the data you want

um and and finally the the last piece is that the physical

storage of the data either

at the time on on disk or

secondary storage um now in memory also should be left up

to um the the dvms implement so you have to worry about whether it's laid out in

in a row format a csv file it's just completely abstracted to you you just

know um what the data is that's in there and you can let the dbms kind of figure

out the specifics of storing it and you know at the time like

i said people argued that um

a dbms would never be able to generate a query plan as efficient as uh kind of

what a human could do kind of like how people used to argue

about you know compilers no one could ever

produce code that's newer no no a computer program compiler

could ever produce code that's as efficient as what

assembly that a human could write now almost no one writes at that level so

kind of it's the same idea um with databases there was a lot of of

human effort that went into designing programs to efficiently access

it because they thought that you couldn't design a a system to do it

uh efficiently

so

i mentioned that the relational model is a type of data model so the data

model is just essentially a high level collection of concepts

uh for describing the data that's stored in in a database

so it's like a high level abstraction for for how we're going to represent the

data now a schema

is more specifically a description of a particular collection

of data given a data model so what does that

mean um

it means that the schema

defines exactly what we're going to store in the database so for example in

the music store example um

the schema would be the artist table followed by the different

attributes that are associated with an artist so that's the schema that you

would define that describes the data that's stored in

the data

so there are as i said lots and lots of different data models

most dbmss that you may have heard of are based on this first relational data

model and

[Music] for a lot of reasons but probably the

biggest one is that the relational model is

uh probably the most flexible of all of them

the relational model can kind of model all of these other or

you you can represent all of these other data models using the relational model

um and the the the exact you know uh uh api or or what's going on behind

the scenes might not be as efficient but it's still general enough to be able to

handle all these other models so

nosql is a popular term it means a lot of things

to a lot of different people but just at kind of a high level

um

like for example uh it's more than just a

data model a lot of people when they hear nosql think about things like

transactions or consistency or not having

certain apis but just in terms of the actual no sql data model it covers kind

of this key value stores

graph database management systems document databases

mongodb and kind of a broader column family

databases and [Music]

kind of these these data models are more restrictive than what you get with the

relational model um and they don't give you as many as i said kind of guarantees

in terms of um

different properties that we're going to discuss over the course of the semester

uh there are some just

i'll finally say there's some application domains where

these data models might make sense so imagine

i know you're storing video data or you're storing

log data or something you just want to shove it into a key value store that's

that's perfectly valid and might be better

for that particular type of application than a relational database

array and matrix uh database management systems are

kind of specialized more towards machine learning or

um scientific applications there are a few um cyb

tile db but they're not they're not really widespread and kind of they're

narrowly focused on on these sorts of use cases and kind of the last group um

hierarchical network and multi-value these are kind of either obsolete data

models that people tried out in the past and

they find and found didn't work well or they had other problems but they might

still be hanging around in legacy systems

so for the purposes of this course we're

going to be focusing exclusively on the relational model

and how database management system works in

that context

okay so

what is the relational model exactly um

the the relational model

uh defines the the relations inside the

database so like i mentioned the uh individual tables um sometimes they're

in sql they're called tables um

in the relational model they're called relations i i'll probably end up using

them interchangeably but you can think of them just

concretely as those examples from the music store

there's the artist relation table and the album

relation and the the structure of the relational

model defines those relations and the contents inside them

so the next piece as i mentioned is integrity

which ensures that the database's contents um

satisfy some constraints so um with the concern about you know uh

whether or not there could be a garbage string value um inserted or overwritten

on a [Music]

when you're expecting an integer uh year kind of the integrity aspect seeks to

mitigate that problem uh by forcing all of the year values to

be integers and forcing that property and finally there's the the manipulation

aspect which is the programming interface or api that you use to access

and modify um the contents of the database and uh

this is what we're going to talk about later um

in in the lecture uh with relational algebra so relational

algebra is a um

programming programming interface for interacting with

the relational model so

again kind of just uh going through the example a relation is

an unordered set so that's important

there's no order to the values we don't necessarily care what order

they appear in in the database

they could be sorted they could not be sorted uh it doesn't matter it's just a

set um and it contains

the relationship of the attributes that represent entities so

as i said a relation or table has many entries that are called uh um tuples

tuples some people say either either is fine with me um but i'll probably end up

saying both but uh tuples or records also in a table tupler record is

interchangeable there's there's another word that sometimes people use

called rows um

i will try not to use that i might accidentally but a row implies something

specific about how the data is stored so in the csv example you know every every

uh data was stored as an individual line um but

the the tuples and records represent individual

data entries in a table um

the the values are

normally um scalar values things like integer

strings that's not necessarily true anymore in the original specification

they all had to be kind of these scalar values but

um popular systems uh have started relaxing

to store things like you could store an array maybe in an individual column or

like a json document individual um

um and there's also this notion of a null

which is a member of every single uh domain it can be any um attribute can be

set to null and it's not exactly like null in

a null pointer or something but uh it's used to signify that we don't know

what a particular value is so for example if if

the the country that is ice cube is from uh we're null it just means that we

don't we don't know what that value uh we don't know the specific value for

that um record

so uh uh

again just a relation is is a mathematical term that represents uh

this unordered set and um uh sql the sql equivalent is a table

so in entering relation if i say an energy

relation it means that there's a table with n individual columns and individual

attributes unless it's three columns

okay so a big piece of um the relational model is um that every

relation should have a primary key

that uniquely identifies a single tuple so um

some dbmss will will automatically create this for you if you

specify it they'll do it behind the scenes kind of think about like a

an auto incrementing um unique integer um for four keys

so in this this table example here um

there's not really anything that we can use to uniquely identify i guess

i mean you could potentially use the name of the artist

um to

uniquely identify but there's no guarantee that you know all those values

are going to be unique so um

what you can do is add kind of this surrogate primary key that's essentially

just a just an integer and like i said it can be auto generating or random or

whatever um kind of just to keep

each each record or tuple

unique so

foreign keys uh are are related to primary keys in that

they specify um that an attribute from one relation

has a mapping to to some tuple in another relation

so just concretely

if we have this artist key here

and we have the album key we know that uh the artists so the the

new primary key id numbers that we've added to the album table

um the artists 123 789

reference artists stored tuples stored in the artist table so if we want to

know um you know

who wrote one of these or who released one of these albums we can go look up

okay what's the number um

of the artist and then go look up which artist that is

in the area's table but you know there's a problem you can run into

uh which is i mentioned earlier which is what if you want to have

um multiple artists uh on on a single album

so again you release like a mixtape or

something we have a lot of different artists contributing but we only have

this one um attribute to store uh the artist id and

the the solution we come up with in the relational model

is to create this a third table sometimes called the join table which is

going to join or link the artist table with the album table so

we're going to do is we're going to we're going to get rid of that artist

column in the album table and instead

create this new artist album table that has only two things in it so there's an

artist id and an album id and now if if you look at it we can

figure out okay here is how all of the uh artists link

to the the albums that they release so in the case where you have

um you know one

uh uh artist on an album and there's only

going to be one tuple in the artist album relation in

the case we have multiple you'll have now multiple tuples

okay so data manipulation languages or dml

are the specific methods that that we use to

store and retrieve um information from a database

and they come specifically in two flavors so the first is procedural

and that's uh that that a high-level query

should specify how the dbms

should compute the answer to our query so the key word here is how you're

telling the database how you wanted to retrieve the data

and this is going to be a relational algebra that we talked about

uh in a couple slides here you're saying specifically how you want

the data to be retrieved from the database

the alternative is a non-procedural or declarative language

um where you only specify

what data you want retrieved from the database you know you don't tell the

database management system how you want to get it back

you just say uh what data you want and then the system goes and figures out how

to do that for you so

um an example of this non-procedural

or declarative language is relational calculus uh we're not

going to talk too much about relational calculus in this class

um it's important it's uh really important for query optimization

um but it's it's not really recovering this class don't worry too much about it

um relational algebra and

relational calculus are are uh they're logically equivalent

um but we're like i said only focusing on on this first one another example of

a declarative language is sql which we're going to talk about next

class

so relational algebra defines the original

the original specification defines these uh seven

operators and they're all fundamental operations

that you can use uh to retrieve and manipulate the the

two folds in a relationship these are the fundamental operators

proposed by cod

and they're based on

mathematical ideas of set ultra

so each operator listed here is going to

take in one or more relations as input and it's going to output a new relation

so in order to build up a query to get the

data you want out of your database you can kind of chain these operators

together to create more complex operations

so we'll just kind of go through each one starting with select

um sorry is your question no

um so

uh starting with select essentially the

goal of the select operator is to uh choose a subset of the the two poles

from a relation um that satisfy a particular predicate that you uh provide

so the predicate you can think about it acting like a filter or kind of like an

if statement that's only going to retain

uh the tuples that qualify for for the the user specified predicate

and you can of course combine multiple multiple predicates using

conjunctions or disjunctions to get exactly the the

subset that you want i think it's called restrict in the

original um relational model paper but um

everyone everyone calls it a select and the the symbol is the lowercase sigma

um uh

in relational algebra so just as an example we have this really simple

relation here uh r it only has two um

attributes or columns a id and bid

so if we want to for example

restrict or filter

the relation to only cases where aid equals

a2 then we apply that

predicate and we get back uh just that subset that satisfies the

predicate that we that we specified and as i said you can kind of change

things together and say okay give me all of the the records where aid equals a2

and bid equal or is greater than 102. so in

this case you can see you're only going to get that one

tuple

and then if you're wondering how this how this works with sql i apologize i

didn't come up with the naming convention but the the select

relational algebra operator maps to the where clause in a sql statement

um might be a little confusing but select

in relation algebra maps to where clause again we'll talk about sql next times

we'll go through these [Music]

individualities but the projection statement is essentially

going to generate a relation with tackles that only contain the

attributes that you ask for and what does that mean you can do all

sorts of things like rearrange the order of the attributes

you can manipulate the values of the attributes

do different types of modifications it's uh it specified the lowercase pi symbol

and essentially a list of all of the different

modifications

so um here is just an example query where

again we're doing the selection first so i mentioned you can chain them together

we're doing the selection first to get only the records that have a id equals

a2 and then we're performing a

projection um where we're going to modify b by

subtracting 100 and we're going to put you know swap the order of um

the id and that's that's kind of the result you

get so again this is a i didn't come up with the names but the

projection operator maps to the uh select clause of the sql statement so

the selection operator maps to the where clause the projection operator maps to

the selected

the union operator is essentially going to

generate a relation that contains all the tuples that appear

in either or or both relations uh it's just

like a set union um so for example imagine we have

another second table here s which has the same schema as the first one

um to perform uh r

s is going to give us essentially all of

the tuples that appear in r all the tuples that appear in s

and uh the sql syntax for this is a little bit different it's union all in

order to get um potential duplicates um because of a difference between

um set algebra and like a a bag or a

multi-set algebra so you can see here that there are there

is the the duplicate that appears in the union

so in this example i the the output is ordered but that's again not necessarily

to be true um because it's a set they could appear

in uh the output relation could appear in any order

and the answer would still you know still consider the correct so you can't

count on the order in there uh the intersection operator

is going to generate a relation that only contains the tuples that appear in

both of the input relations so it's r intercept s again it's the same

example where r and s both have the same schema and what we want to do is find

kind of the intersection it's going to give us only a3

appears in both r and s so you can do this in

sql using the intercept operator so just as an example of when

this might be useful if you think about the music store

example um maybe we have one relation

representing the rap artists another one representing um

rock or country artists and you want to know which artists have um

both rap albums and country albums so you just do an

intersection of the two relations to get that answer

the difference operator is going to generate a relation that

contains only the tuples that appear in the first relation and not the second

relation so in this example here you end up with

only the unique ones that appear appear in r and not s

and you can do that in sql using the accept

keyword

okay the product is essentially going to generate a

relation that contains all of the possible combinations of tuples from um

the both input relations so

um sometimes it's called the cartesian product but it's the product of two

relations it's going to be all the pairwise combinations

essentially what you're going to get from doing

um the product of rns is kind of all of these uh pairwise combinations of tuples

from from both relations this might seem kind of useless but it

does show up sometimes you know if you want to get

generate all the possible combinations um in two tables uh but more importantly

what what this is going to be used for is just from a conceptual or theoretical

perspective it's going to let us model the next

operator we're going to talk about which is a join

so can you get all these these pairwise combinations

uh this is the the syntax and sql for how to do it

you can get all these pairwise combinations but now let's say that you

just want the pairwise combinations where your

primary key that we talked about in your foreign key match

so you have two keys that match so the join operator is going to generate a

relation that

contains all all the tuples are a combination

of the the two inputs where there's a

common value for one or more attributes depending on on what you specify

so uh what we're going to do is we're going

to look for matches here and again these two tables

have the same schema but you could do it in an arbitrary case in the music store

example you have the artist

relation and the album's relation and they share the

artist's primary key that they join on

so what's happening here with the join uh

operator is that we're only finding the matches like i said uh that appear in

both uh the r table and the s table

so like i said kind of this this conceptually if you think about what the

the product operator does you could produce all of these pairwise

optimizations very sorry so you produce all these pairwise combinations and then

um filter it down to just uh uh the the set that matches uh where

the keys match but of course you never do this um

because you know you have to first enumerate all the different uh

combinations and then perform the filter so there are different optimizations you

you might want to do to short-circuit this but from a theoretical perspective

conceptual perspective it's useful to think about

in this way so

the sql syntax for this and again we'll go over these in in more detail

next class but the sql syntax to do this joint here

um is the natural journal

um so uh over time like i said there there

have been um extensions the original

uh relational algebra where they built up more operators there's now

a bunch that people have added rename assignment duplicate elimination

animation imagine you want to count how many

um albums a particular artist is released

uh sorting so you can actually impose some kind of ordering uh on the

unordered set um and set division

so there are analogs for all of these in

sql that we'll talk about don't don't worry too much about them they're not

going to be super important for the course

um so just in observation about relation relational algebra um and we've gone

through all the operators but [Music]

it's still defining more or less the high level

steps that are necessary for how to compute a query so essentially

we're telling um

the database management system exactly how it should go about computing the

query and in the example here um we have two

you know more or less equivalent queries on on

the one side you're doing uh the join between r and s first before

applying the filter to only the two volts that have bid 102

and on the other side uh you're filtering s to only the tuples that have

102 uh bid equals 102 and then performing the joint so kind of these

these two while they're going to produce the exact same answer one might be a lot

more efficient than the other you know if you

have again a billion tuples in the relation

you might want to do the filtering first so you get down just one rather than

having to you know find all the billion matches and then then do the filter so

in this way um the the the uh relational algebra is still

procedural and not declarative so really what we'd like is is a declarative

language like sql for exiting um the database and that's kind of this

idea where you want to state the high level

answer or exactly what you want the database management system to compute

for you rather than telling it how it should go

about doing it and essentially you can just leave

the low level details about you know how to actually do it to the database

management system and if it's well implemented it should do it

a lot better than the kind of

high level procedural query you would produce

so the relational model just as a concept is independent of any kind of

specific um query language implementations there are a lot that got

proposed over the years um i think there's an alpha proposed

originally proposed by cod but no one talks about that anymore

there's quail which increased by someone from berkeley

and [Music]

sql kind of emerged as the de facto standard some people call it sql

it sql both are fine i'll still know what you're talking about if you say

um so it's kind of emerged as the de facto standard um and there are standard

specifications but uh pretty much every um

system implements its own uh

variant so uh if you write a query for my sequel it

might not exactly match something that runs in postgres or oracle or sqlite or

whatever uh so kind of that's the tricky part there is a standard that everyone

like you know 98 adheres to but there's this kind of wiggle room where people

implement their own special um

divergences so going way back to the python example

i gave earlier this was the code where you're going to iterate over

all the lines and file to find

the year that ice cube went solo and if we rewrite that

in in a sql query we get this a lot more compact specification

for what we want and not how we want the database management system

uh to give it to us so we say we want to select the year from the artists table

where the name of the artist is ice cube so that's a lot a higher level and we

don't have to worry about kind of the low level details about reading the

lines parsing the lines all that stuff we just tell the database management

system this is what we want this is the answer that we want you

figure out how to get it back to me so

that kind of wraps everything up [Music]

the the key takeaways are that you know databases are ubiquitous they're using

all sorts of applications all over the place there's any amount of data being

managed in an application you're using

um there is almost certainly a database management

system behind the scenes um relational algebra kind of defines

the the primitives for processing queries on a relational database

and we're going to see relation algebra

again when we talk about query optimization and execution

um but for now the next class is going to be uh

specifically about sql where you go through some of the more advanced uh

topics with with sql so um that's it and

we'll see you [Music]

[Applause] [Music]

[Music]

[Music]

i put in much work with the bmt and the e-trouble get us a saint i grew on the

double

you
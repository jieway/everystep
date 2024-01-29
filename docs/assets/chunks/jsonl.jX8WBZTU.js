const n=Object.freeze({displayName:"JSON Lines",name:"jsonl",patterns:[{include:"#value"}],repository:{array:{begin:"\\[",beginCaptures:{0:{name:"punctuation.definition.array.begin.json.lines"}},end:"\\]",endCaptures:{0:{name:"punctuation.definition.array.end.json.lines"}},name:"meta.structure.array.json.lines",patterns:[{include:"#value"},{match:",",name:"punctuation.separator.array.json.lines"},{match:"[^\\s\\]]",name:"invalid.illegal.expected-array-separator.json.lines"}]},comments:{patterns:[{begin:"/\\*\\*(?!/)",captures:{0:{name:"punctuation.definition.comment.json.lines"}},end:"\\*/",name:"comment.block.documentation.json.lines"},{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment.json.lines"}},end:"\\*/",name:"comment.block.json.lines"},{captures:{1:{name:"punctuation.definition.comment.json.lines"}},match:"(//).*$\\n?",name:"comment.line.double-slash.js"}]},constant:{match:"\\b(?:true|false|null)\\b",name:"constant.language.json.lines"},number:{match:`(?x)        # turn on extended mode
  -?        # an optional minus
  (?:
    0       # a zero
    |       # ...or...
    [1-9]   # a 1-9 character
    \\d*     # followed by zero or more digits
  )
  (?:
    (?:
      \\.    # a period
      \\d+   # followed by one or more digits
    )?
    (?:
      [eE]  # an e character
      [+-]? # followed by an option +/-
      \\d+   # followed by one or more digits
    )?      # make exponent optional
  )?        # make decimal portion optional`,name:"constant.numeric.json.lines"},object:{begin:"\\{",beginCaptures:{0:{name:"punctuation.definition.dictionary.begin.json.lines"}},end:"\\}",endCaptures:{0:{name:"punctuation.definition.dictionary.end.json.lines"}},name:"meta.structure.dictionary.json.lines",patterns:[{comment:"the JSON object key",include:"#objectkey"},{include:"#comments"},{begin:":",beginCaptures:{0:{name:"punctuation.separator.dictionary.key-value.json.lines"}},end:"(,)|(?=\\})",endCaptures:{1:{name:"punctuation.separator.dictionary.pair.json.lines"}},name:"meta.structure.dictionary.value.json.lines",patterns:[{comment:"the JSON object value",include:"#value"},{match:"[^\\s,]",name:"invalid.illegal.expected-dictionary-separator.json.lines"}]},{match:"[^\\s\\}]",name:"invalid.illegal.expected-dictionary-separator.json.lines"}]},objectkey:{begin:'"',beginCaptures:{0:{name:"punctuation.support.type.property-name.begin.json.lines"}},end:'"',endCaptures:{0:{name:"punctuation.support.type.property-name.end.json.lines"}},name:"string.json.lines support.type.property-name.json.lines",patterns:[{include:"#stringcontent"}]},string:{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.json.lines"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.json.lines"}},name:"string.quoted.double.json.lines",patterns:[{include:"#stringcontent"}]},stringcontent:{patterns:[{match:`(?x)                # turn on extended mode
  \\\\                # a literal backslash
  (?:               # ...followed by...
    ["\\\\/bfnrt]     # one of these characters
    |               # ...or...
    u               # a u
    [0-9a-fA-F]{4}) # and four hex digits`,name:"constant.character.escape.json.lines"},{match:"\\\\.",name:"invalid.illegal.unrecognized-string-escape.json.lines"}]},value:{patterns:[{include:"#constant"},{include:"#number"},{include:"#string"},{include:"#array"},{include:"#object"},{include:"#comments"}]}},scopeName:"source.json.lines"});var e=[n];export{e as default};

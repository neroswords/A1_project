from Project.nlp import sentence_get_confident
from pythainlp.tokenize import word_tokenize
import re 

# while True:
#     inp = input()
#     print(sentence_get_confident(inp, "มีเสื้อแดงมั้ย"))


def checkVariable(ss2):
    flag = []
    endflag = []
    key = []
    switch = False
    j=1
    # s1 = word_tokenize(ss1)   #from input
    s2 = word_tokenize(ss2)   #from database
    for i in range(len(s2)):
        if s2[i] == "<":
            if i-1 >= 0 and isnotSymbol(s2[i-1]) and s2[i-1] != " ":
                flag.append(s2[i-1])
            elif i-2 >= 0 and isnotSymbol(s2[i-2]) and s2[i-2] != " ":
                flag.append(s2[i-2])
            elif i-3 >= 0 and isnotSymbol(s2[i-3]) and s2[i-3] != " ":
                flag.append(s2[i-3])
            flag.append(flag)
            switch = True
            while switch:
                if s2[i+j] == ">":
                    if i+j+1 < len(s2) and s2[i+j+1] != '<':
                        endflag.append(s2[i+j+1])
                    else:
                        endflag.append("/")
                    i = i+j
                    switch = False
                    j = 1
                    break
                key.append(s2[i+j])
                j+=1
    # print(sentence_get_confident(ss1,ss2,list=invert))
    return flag, endflag, key

#use with reg

def isnotSymbol(string): 
    # Make own character set and pass  
    # this as argument in compile method 
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]') 
      
    # Pass the string in search  
    # method of regex object.     
    if(regex.search(string) == None): 
        return True
    else: 
        return False

# print(checkVariable("ขายเสื้อ<สีแดง>มั้ย"))

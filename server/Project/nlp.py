import warnings
from pythainlp.tokenize import word_tokenize
import pythainlp.util
from pythainlp.word_vector import *
from sklearn.metrics.pairwise import cosine_similarity  # ใช้หาค่าความคล้ายคลึง
from pythainlp.soundex import udom83
import numpy as np

warnings.filterwarnings('ignore')

model=get_model() # ดึง model ของ thai2vec มาเก็บไว้ในตัวแปร model
def sentence_vectorizer(ss,dim=300,use_mean=True): # ประกาศฟังก์ชัน sentence_vectorizer
    s = pythainlp.word_tokenize(ss)
    vec = np.zeros((1,dim))
    for word in s:
        if word in model.wv.index2word:
            vec+= model.wv.word_vec(word)
        else: pass
    if use_mean: vec /= len(s)
    return vec

def sentence_similarity(s1,s2):
    return cosine_similarity(sentence_vectorizer(str(s1)),sentence_vectorizer(str(s2)))

def sentence_sound_index(ss1,ss2):
    s1 = word_tokenize(ss1)
    s2 = word_tokenize(ss2)
    if len(s1) > len(s2):
        s1 = x
        s1 = s2
        s2 = x
    catch = 0
    print(len(s1))
    print(len(s2))
    for i in range(len(s1)):
        if udom83(s1[i]) == udom83(s2[i]) or (i+1<len(s2) and udom83(s1[i]) == udom83(s2[i+1])) or (i-1 >=0 and udom83(s1[i]) == udom83(s2[i-1])): 
            catch += 1
    if len(s1) > len(s2):
        return catch/len(s1)
    else:
        return catch/len(s2)

def sentence_get_confident(ss1,ss2):
    return (sentence_similarity(ss1,ss2)+sentence_sound_index(ss1, ss2))/2

# print(example[inp])
# print(pythainlp.util.isthai(inp))
# print(sentence_similarity("ครับ", "คร้าบ"))
# print(word_tokenize("มีเสื้อสีแดงป้ะ"))
# print(sentence_get_confident("มีเสื้อสีแดงมั้ย", "มีเสื้อแดงมั้ย"))



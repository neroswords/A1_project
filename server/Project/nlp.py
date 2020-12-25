import warnings
from  pythainlp import *
import pythainlp.util
from pythainlp.word_vector import *
from sklearn.metrics.pairwise import cosine_similarity  # ใช้หาค่าความคล้ายคลึง
import numpy as np

warnings.filterwarnings('ignore')

model=get_model() # ดึง model ของ thai2vec มาเก็บไว้ในตัวแปร model
def sentence_vectorizer(ss,dim=300,use_mean=True): # ประกาศฟังก์ชัน sentence_vectorizer
    s = word_tokenize(ss)
    vec = np.zeros((1,dim))
    for word in s:
        if word in model.wv.index2word:
            vec+= model.wv.word_vec(word)
        else: pass
    if use_mean: vec /= len(s)
    return vec
def sentence_similarity(s1,s2):
    return cosine_similarity(sentence_vectorizer(str(s1)),sentence_vectorizer(str(s2)))

example = {'สวัสดี' : 'สวัสดีคร้าบ', 'สบายดีมั้ย' : 'ก็สบายดีครับ'}
inp = "สบายดีมั้ย"


print(example[inp])
print(pythainlp.util.isthai(inp))
print(sentence_similarity("สวัสดีครับ", "สวัสดีคร้าบ"))
print(word_tokenize("สวัสดีครับ"))



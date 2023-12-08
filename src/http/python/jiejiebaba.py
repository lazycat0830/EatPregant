import jieba
import sys
import json

# jieba.case_sensitive = True 
# 可控制對於詞彙中的英文部分是否為case sensitive, 預設False

sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)
content = sys.argv[1]

with open('src\http\python\jiebahouse\stops.txt', 'r', encoding='utf8') as f:  # 中文的停用字
    stops = f.read().split('\n') 

#自訂停用詞
with open('src\http\python\jiebahouse\CusStop.txt', 'r', encoding='utf8') as f:
    stops += f.read().split('\n')

#自訂詞庫
userdict = open("src\http\python\jiebahouse\CusDic.txt", "r", encoding='UTF-8')
for line in userdict.readlines():  # 依次读取每行
    line = line.strip()  # 去掉每行头尾空白
    jieba.add_word(line)
    

seg_list = [t for t in jieba.lcut(content, cut_all=False) if t not in stops]
result_json = json.dumps(seg_list, ensure_ascii=False)  # 將列表轉換為 JSON 字符串
print(result_json)
sys.stdout.flush()

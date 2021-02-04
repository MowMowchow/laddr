import json
# a python program to filter the data
# organized data into a json with field of education as keys
#  stored at each key is an array containg objects with fields of degree leve and income


data_type = None
while data_type not in ["female", "male", "total"]:
  data_type = input()


with open('data/'+data_type+'_income_data.json') as temp_json:
  data = json.load(temp_json)


# field to keep: 
#  - "Educational qualification"
#  - "Field of study"
#  - "UOM": "2018 constant dollars"
#  - "VALUE"

# when running through data make sure UOM = 2018 constant dollars
# organize by fields of study
# have an array of objects of:
#  -> educational qualification: value
filtered_data = {}
for obj in data:

  if obj['UOM'] == '2018 constant dollars':
    if obj['Field of study'][:-4] not in filtered_data and obj['Field of study'] != "Total, field of study":
      filtered_data[obj['Field of study'][:-4]] = []

    if obj['Field of study'][:-4] in filtered_data:
      temp = {"Education_Level": obj['Educational qualification'], "Annual_Income": obj['VALUE']}
      filtered_data[obj['Field of study'][:-4]].append(temp)



with open('data/filtered_'+data_type+'_income_data.json', 'w', encoding='utf-8') as json_file:
    json.dump(filtered_data, json_file, ensure_ascii=False, indent=4)

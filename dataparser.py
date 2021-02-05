import json
# a python program to filter the data
# organized data into a json with field of education as keys
#  stored at each key is sex, then an array containg objects with fields of degree level and income


filtered_data = {}
for data_type in ['female', 'male', 'total']:
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
  for obj in data:
    if obj['UOM'] == '2018 constant dollars':
      if obj['Field of study'][:-4] not in filtered_data and obj['Field of study'] != "Total, field of study":
        filtered_data[obj['Field of study'][:-4]] = {}

      if obj['Field of study'][:-4] in filtered_data:
        if  data_type not in filtered_data[obj['Field of study'][:-4]]:
          filtered_data[obj['Field of study'][:-4]][data_type] = []
        
        if obj['Educational qualification'] == "Career, technical or professional training certificate":
          temp = {"Education_Level":"Career, Technical, Professional Training Certificate", "Annual_Income": obj['VALUE']}
        elif obj['Educational qualification'] == "Career, technical or professional training diploma":
          temp = {"Education_Level":"Career, Technical, Professional Training Diploma", "Annual_Income": obj['VALUE']}
        else:
          temp = {"Education_Level": obj['Educational qualification'], "Annual_Income": obj['VALUE']}
        filtered_data[obj['Field of study'][:-4]][data_type].append(temp)





with open('data/filtered_income_data.json', 'w', encoding='utf-8') as json_file:
    json.dump(filtered_data, json_file, ensure_ascii=False, indent=4)

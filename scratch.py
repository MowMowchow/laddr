salary = 45000
final = int(salary)
age = 18
retirement = 65
for i in range(age, retirement):
  salary *= 1.03
  final += salary

print(final)

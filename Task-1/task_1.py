def reverseOnlyLetters(arr):
    ampersand = arr.pop(2)
    dollar = arr.pop(5)
    porcen = arr.pop(12)
    reversed_arr = list(reversed(arr))
    reversed_arr.insert(2, ampersand)
    reversed_arr.insert(6, dollar)
    reversed_arr.insert(14, porcen)

    return reversed_arr


print(reverseOnlyLetters(["n", "2", "&", "a", "l", "9",
      "$", "q", "47", "i", "a", "j", "b", "z", "%", "8"]))

export enum RegexEnums {
    EMAIL = "^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$",
    PASSWORD = "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$",
    NAME = "^[A-Z][a-z]{1,9}$",
    PHONE = "^(\\+380|0)\\d{9}$",
    CITY = "^[A-Za-zА-Яа-яІіЇїЄє\\s'-]+$",
    TIME = "^(?:[01]\\d|2[0-3])[:.][0-5]\\d$",
    DATE = "^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) ([1-9]|[12][0-9]|3[01])$",
}
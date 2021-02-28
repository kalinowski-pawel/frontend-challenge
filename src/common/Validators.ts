const SPECIAL_FIELD = {
  EMAIL: 'email',
  AVATAR: 'avatar'
}

export const isEmail = (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

export const isUrl = (value: string) => {
  const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return re.test(value);
};

export const isEmpty = (value: string) => value !== '';

export const isValid = (value: string, field: string) => {
  let result = isEmpty(value)

  if(field === SPECIAL_FIELD.EMAIL){
    result = isEmail(value)
  }
  if(field === SPECIAL_FIELD.AVATAR){
    result = isUrl(value)
  }
  return result;

}

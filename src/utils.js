import { faker } from "@faker-js/faker";

export const generateUserInfo = () => {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    name: faker.name.fullName(),
    role: faker.helpers.arrayElement([
      "fresh",
      "junior",
      "mid",
      "senior",
      "principal",
      "architect",
      "any",
    ]),
    subscriptionType: faker.helpers.arrayElement([
      "Free",
      "Starter",
      "Premium",
    ]),
  };
};

export const generatePorjectsData = () => {
  let output = [];
  for (let i = 0; i < 15; i++) {
    output.push({
      label: faker.company.name(),
      id: faker.datatype.uuid(),
      isVolunteering: faker.helpers.arrayElement(["false", "false"]),
      calculationType: faker.helpers.arrayElement([
        "hour",
        "task",
        "storyPoint",
      ]),
      authorizedRole: faker.helpers.arrayElement([
        "fresh",
        "junior",
        "mid",
        "senior",
        "principal",
        "architect",
        "any",
      ]),
    });
  }
  return output; 
};
export const getCalculatedBalance = ({balance, isVolunteering, number, calculationType}) => {
    const currentBalance = balance || 0;
    if(isVolunteering === 'true'){
        return currentBalance; 
    }else{
        let payment = 0; 
        switch(calculationType){
            case 'hour':{
                payment = number * 100; 
                break; 
            }
            case 'task':{
                payment = number * 10; 
                break; 
            }
            case 'storyPoint':{
                payment = number * 23; 
                break; 
            }
        }
        return payment + currentBalance;
    }

}

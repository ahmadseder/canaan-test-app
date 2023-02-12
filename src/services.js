import {commandFailedToPass} from '@canaan_run/canaan'; 
import { projectsApp, addEntry, getBalance, updateBalance } from "./CQRS";

const balanceCalculater = ({isVolunteering, number, calculationType}) => {
    const currentBalance = getBalance() || 0;
    if(isVolunteering === 'true'){
        updateBalance(currentBalance); 
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
        updateBalance(payment + currentBalance); 
    }

}
projectsApp.onCommand((command)=>{
    const {type, payload} = command; 
    if(type === addEntry.commandName){
        balanceCalculater(payload); 
    }
    if(type === commandFailedToPass.commandName){
        alert(payload?.event?.params?.message);
    }
});


projectsApp.listen(commandFailedToPass.commandName);

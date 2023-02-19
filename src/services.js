import { projects,addEntry, getBalance, updateProjectBalance } from './CQRS';
import {getCalculatedBalance} from './utils';





projects.onCommand((command)=>{
    const {type, payload} = command;
    console.log({command});
    if (type === 'commandFailedToPass') {
        alert('you have reached the limit')
    }
    if(type === addEntry.commandName){
        const newBalance = getCalculatedBalance({
            balance: getBalance(),
            isVolunteering: payload.isVolunteering,
            number: payload.number,
            calculationType: payload.type
        });
        updateProjectBalance(newBalance);

    }
});

projects.listen('commandFailedToPass')
/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (privateProps, props) => {  
    return props.map(val => {
        for(let key in privateProps) {
            if(val.hasOwnProperty(privateProps[key])) {
                delete val[privateProps[key]];
            }
        }
    
        return val;
    })
};
exports.excludeByProperty = (excludeProp, props) => {
    return props.filter(val => !val.hasOwnProperty(excludeProp))
};
exports.sumDeep = (sumArrObj) => {
    sumArrObj.forEach(element => {
        if(element.hasOwnProperty("objects")) {
            let total = 0;
            element.objects.forEach(object => {
                if(object.hasOwnProperty("val")) {
                    total += object["val"];
                }
            })

            element.objects = total;
        }
    });
    
    return sumArrObj;
};
exports.applyStatusColor = (colorRules, statusArray) => {
    return statusArray.map(val => {
        for(let key in colorRules) {
            if(colorRules[key].indexOf(val["status"]) != -1) {
                val.color = key;
                break;
            } 
        }

        return val;
    }).filter(val => val.hasOwnProperty("color"));;
};
exports.createGreeting =  (greeting, sentence) => name => greeting(sentence, name)
exports.setDefaults = (defaultProps) => {
    return (user) => {
        for(let key in defaultProps) {
            if(!user.hasOwnProperty(key)) {
                return { ...user, ...defaultProps }
            }
        }
        return user;
    }

};
exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
    const [users, status] = await Promise.all([
        services.fetchUsers(),
        services.fetchStatus(),
    ]);
    const user = users[users.findIndex(val => val.name == userName)]
    const company = await services.fetchCompanyById(user.companyId);

    return {
        company: company,
        status: status,
        user: user,
    }
};

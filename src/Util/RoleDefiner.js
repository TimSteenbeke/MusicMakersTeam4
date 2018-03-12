/**
 * Created by Ben on 12/03/2018.
 */

export function isUserAdmin(roles) {
    for (let i=0; i< roles.length; i++) {
        if (roles[i].roleName == "Admin") {
            return true;
        }
    }
    return false;
}

export function isUserTeacher(roles) {
    for (let i=0; i<roles.length;i++) {
        if (roles[i].roleName == "Teacher") {
            return true;
        }
    }
    return false;
}
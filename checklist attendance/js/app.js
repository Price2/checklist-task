/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

var studentTableModel =
{
students:[
    {id:1,
    name: 'Slappy the Frog',
    daysAttendance: [],
    daysMissed: 0,
    },
    {id:2,
    name: 'Paulrus the Walrus',
    daysAttendance: [],
    daysMissed: 0,
    },
    {id:3,
    name: 'Lilly the Lizard',
    daysAttendance: [],
    daysMissed: 0,
    },
    {id:4,
    name: 'Gregory the Goat',
    daysAttendance: [],
    daysMissed: 0,
    },
    {id:5,
    name: 'Adam the Anaconda',
    daysAttendance: [],
    daysMissed: 0,
    }
    
    
],

init: function() {
    // debugger;
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        // var nameColumns = $('tbody .name-col'),
            attendance = {};

        this.students.forEach(function(student) {
            // console.log(student)
            var name = student.name;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
                student.daysAttendance.push(attendance[name][i])
            }
        });
        // console.log(this.students)
        localStorage.attendance = JSON.stringify(this.students);
    }
    else{
        
        let attendance = JSON.parse(localStorage.getItem("attendance"));
        var data_obj = {}
        studentTableModel.students = []

     $.each(attendance, function (idx, valueOfElement) { 
        studentTableModel.students[idx] = valueOfElement
         
        });
    }
}
    
}




var studentController =
{
    init: function(){
        studentTableModel.init()
        this.countMissing()
        tableView.init()
    },

    getAllStudents: function(){
        return studentTableModel.students
    },

    saveLocalStorage: function(obj){
        localStorage.attendance = JSON.stringify(obj)
    },
    countMissing: function(){
        
         studentTableModel.students.forEach(function(element, idx){
            console.log(element + " IDX: "+idx)
           studentTableModel.students[idx].daysMissed = studentTableModel.students[idx].daysAttendance.filter((element) => !element).length
        });
        console.log(JSON.stringify(studentTableModel.students))
        this.saveLocalStorage(studentTableModel.students)
    },
    countCheckedBox: function(student_id, value, idx){
        studentTableModel.students[student_id].daysAttendance[idx] = value
        this.saveLocalStorage(studentTableModel.students)
        // localStorage.attendance = JSON.stringify(studentTableModel.students)
        console.log("obj id: "+student_id +"student model: "+ studentTableModel.students[student_id].daysAttendance)
        this.countMissing()
        tableView.render()
    }


}



var tableView ={
    
    init: function(){
        this.studentsWrapper = $("#students-wrapper")
        this.render()
    },
    
    render: function() {
        var students = studentController.getAllStudents()
        console.log(students)
        this.studentsWrapper.html('')
        for(let j = 0; j < students.length; j++) {
            // debugger
           this.table = $(`<tr class="student"></tr>`)
           this.name = $(`<td class="name-col">${students[j].name}</td>`)
           this.daysMissed = $(`<td class="missed-col">${students[j].daysMissed}</td>`)
            for (let i = 0; i < students[j].daysAttendance.length; i++) {
                this.tr = $(`<td class="attend-col"></td>`)
                this.input = $(`<input type="checkbox" />`)
                this.input.prop('checked', students[j].daysAttendance[i])
                // console.log("checked? "+ this.input.prop('checked'))
                this.tr.append(this.input)
                this.table.append(this.tr)
                $(this.input).click(function (e) { 
                    studentController.countCheckedBox(j, $(this).prop('checked'), i)
                    
                });
            }
            this.table.prepend(this.name)
            this.table.append(this.daysMissed)
            this.studentsWrapper.append(this.table)
            
        }
    }
}

$(document).ready(function () {
    studentController.init()
});
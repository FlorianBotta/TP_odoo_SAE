/** @odoo-module */
import {Reactive} from "@web/core/utils/reactive";
import {registry} from "@web/core/registry";

export class TetrasStore extends Reactive {
    mainScreen = {name: null, component: null};
    static serviceDependencies = [
        "orm",
    ];

    constructor() {
        super();
        this.ready = this.setup(...arguments).then(() => this);
    }

    async setup(env, {orm}) {
        this.env = env;
        this.orm = orm;
        this.newStudents = [];
        await this.load_server_data();

        this.showScreen("StudentListScreen");
    }

    async load_server_data() {
        const loadedData = await this.orm.silent.call("tetras.management", "load_tetras_data", []);
        await this._processData(loadedData);
    }

    processClassroom() {
        for (let classroom of this.classrooms) {
            console.log("classroom", classroom.students);
            classroom.students = this.students.filter(student => student.classroom_id[0] === classroom.id);
        }
    }

    processControl() {
        for (let control of this.controls) {
            control["grades"] = [];
            for (let student of this.students) {
                for (let student_grade of this.students_grade_ids) {
                    if (student.id === student_grade.student_id[0] && control.id === student_grade.control_id[0]) {
                        student_grade.student = student;
                        control.grades.push(student_grade);
                    }
                }
            }
        }
    }

    async _processData(loadedData) {
        this.students = loadedData["tetras.student"];
        this.teachers = loadedData["tetras.teacher"];
        this.classrooms = loadedData["tetras.classroom"];
        this.students_grade_ids = loadedData["tetras.student.grade"];
        this.controls = loadedData["tetras.control"];
        this.processClassroom();
        this.processControl();
    }


    showScreen(name, props) {
        const component = registry.category("tetras_screens").get(name);
        this.mainScreen = {component, props};
    }

    getControl(id) {
        return this.controls.find(control => control.id === id);
    }
}

export const tetrasService = {
    dependencies: TetrasStore.serviceDependencies,
    async start(env, deps) {
        return new TetrasStore(env, deps).ready;
    },
};

registry.category("services").add("tetras", tetrasService);

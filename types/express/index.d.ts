import { ContactPost, DbContact } from "../contact";
import { IExercise } from "../IExercise";

// declare namespace Express {
//   interface Request {
//     hejString: string;
//     exerciseServices: () => {
//       addExerciseService: () => IExercise;
//       getAllExercisesService: () => IExercise[];
//       getExerciseById: () => IExercise;
//     };
//   }
// }

declare module "express" {
  interface Request {
    createContact: any;
    getAllContacts: any;
    getContactById: any;
    // addExerciseService?: (exe: IExercise) => Promise<IExercise>;
    // getAllExercisesService?: () => Promise<IExercise[]>;
    // getExerciseByIdService?: (id: string) => Promise<IExercise | null>;
    // exerciseServices: () => {
    //   getAllExercisesService: () => Promise<IExercise[]>;
    //   addExerciseService: (exe: IExercise) => Promise<IExercise>;
    //   getExerciseById:(id: string) => Promise<IExercise | null>;
    // };
  }
}

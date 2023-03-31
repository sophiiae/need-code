export interface ProblemModel {
  /**
   * Unique id of problem
   */
  id: number,
  /**
   * Title of problem
   */
  title: string,
  /**
   * Url of problem
   */
  url: string,
  /**
   * Difficulty of problem, 1(easy), 2(medium), 3(hard)
   */
  difficulty: number,
  /**
   * Indicator of whether problem is premium only. 1-yes, 0-no
   */
  paidOnly: number,
  /**
   * Indicator of whether problem is saved as use's favor. 1-yes, 0-no
   */
  favor: number,
  /**
   * Number of times this problem has been solved by user.
   */
  solved: number,
  /**
   * Date of user last submit
   */
  lastSubmit: string,
  /**
   * Url of user's note. Default: ''
   */
  noteUrl: string,
}

export interface ProblemsObject {
  [id: number]: ProblemModel
}

export interface ReviewObject {
  [id: number]: number,
}
export interface UserDataModel {
  problems: ProblemsObject,
  review: ReviewObject,
  settings: UserSettings
}

export interface UserSettings {
  username: string,
}

export interface UserProfileModel {
  user: any,
  isUserActive: boolean,
  hasDataChanged?: boolean,
  data?: UserDataModel,
  settings: UserSettings
}

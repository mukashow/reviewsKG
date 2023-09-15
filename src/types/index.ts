type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export type AppStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Home: undefined;
  UserProfile: undefined;
  LeaveReviewToUser: undefined;
  LeaveReview: {
    phone?: string;
  };
  CodeVerification: undefined;
  SignUpAsPerformer: undefined;
  SignUpSelectService: undefined;
  MyProfile: undefined;
  NullComponent: undefined;
  Services: undefined;
  LeaveReviewHome: undefined;
  SearchResult: undefined;
};

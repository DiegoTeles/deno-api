export default interface User  {
    _id: {
        $oid: string;
      };
      name: string;
      middleName: string;
      profession: string;
}

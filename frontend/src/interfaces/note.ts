export default interface noteInterface {
  id: number;
  title: string;
  text: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface SubmissionFormState {
  title: string;
  subTitle: string;
  imageUrl: string;       // cover / card image (data-url)
  bodyImage: string;      // optional mid-body image (data-url)
  authorName: string;
  authorImage: string;
  authorLinkedIn: string;
  content: string;
  category: string;
}

export const DEFAULT_AUTHOR_IMAGE = 'https://ui-avatars.com/api/?name=Writer&background=0D8ABC&color=fff';

export const BLOG_CATEGORIES = [
  { label: 'Recent Blogs',       value: 'recent-blogs' },
  { label: 'Tech Farms',         value: 'tech-farming' },
  { label: 'Government Schemes', value: 'government-schemes' },
  { label: 'Others',             value: 'others' },
] as const;

export const initialSubmissionState: SubmissionFormState = {
  title: '',
  subTitle: '',
  imageUrl: '',
  bodyImage: '',
  authorName: '',
  authorImage: '',
  authorLinkedIn: '',
  content: '',
  category: 'recent-blogs',
};

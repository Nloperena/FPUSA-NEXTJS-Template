export interface GoogleReview {
  id: string;
  clientName: string;
  clientPhoto: string;
  rating: number;
  reviewText: string;
  date: string;
  location?: string;
}

export const googleReviews: GoogleReview[] = [
  {
    id: "1",
    clientName: "Sandy Bennett",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocIQWZ97Ur9JcKkBjWbfs6YDRWeSFoudu2hOjuDKTfkOn6ewAA=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "Joe and Laura are amazing. Myself and my husband was ripped off by a furniture company that was furnishing our vacation home in Orlando. Out the gate Joe was very helpful with helping us recover.",
    date: "3 months ago",
    location: "Davenport, FL"
  },
  {
    id: "2",
    clientName: "Margaret",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocIBJ-biUBqNRR1wUG15XywmpBDLk6gRbk_GcC6WBlN-mWBtMg=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "I can't say enough good things about Laura at Furniture Packages USA! Within an hour, she came out to view my home, took pictures, and just a few days later had designs ready!",
    date: "a month ago",
    location: "Orlando, FL"
  },
  {
    id: "3",
    clientName: "C L",
    clientPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjWzPjRVoL_R3lxl7zD7z5yHnb74sF-orBojJ4XJ9ZiU36R_36yeEw=w600-h600-p-rp-mo-ba2-br100",
    rating: 5,
    reviewText: "I am a Realtor and service the entire state of Florida. Furniture Packages USA have been OUTSTANDING! Joe and Laura have gone above and beyond for my client!",
    date: "10 months ago",
    location: "Florida Realtor"
  },
  {
    id: "4",
    clientName: "Alok M",
    clientPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjWHSnRGjAPmse6fIvDzR6dTH8ejw6as3otTFukdhSzB8XJS4PqTpw=w600-h600-p-rp-mo-ba2-br100",
    rating: 5,
    reviewText: "Amazing to work with Joe on our resort home in Florida. The responsiveness, flexibility and empathy with which Joe and team works. Our home looked absolutely stunning!",
    date: "a year ago",
    location: "Azur Resort"
  },
  {
    id: "5",
    clientName: "Deepak Jain",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocJhoko2GJBUR9MVVaBH4j6jVFAMLZuTumheW5rxfr-g74JHdQ=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "Family owned company that treats its customers like family. Joe and his team have the highest integrity. From designing to final delivery and after sales service, everything was perfect!",
    date: "2 years ago",
    location: "Orlando, FL"
  },
  {
    id: "6",
    clientName: "Colleen Anthony",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocJUrZt1vde65FsZ84r-O1_XVW0MOYdPIf7mpAb9WhfH6FdSww=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "Joe and Laura were amazing!! I have ABB properties in several states and this by far was the easiest process ever!!",
    date: "2 years ago",
    location: "Multi-property Owner"
  },
  {
    id: "7",
    clientName: "Raja VS",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocIQScJCpUkOK-nFpiMwSp98Skjls7G_-9I5Is0i7etvtUEtijQ=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "Excellent for remote investors like me. Great flexible support, from design meetings to final delivery. The design team provided candid feedback on what works best.",
    date: "a year ago",
    location: "Remote Investor"
  },
  {
    id: "8",
    clientName: "Joyce Good",
    clientPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjUiFfz2XBevRcIkIIJ4uFIaS5w6t0gzGvEG-YP311fMdCjZRZQ=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "Great experience! We used Furniture Packages USA for design, purchase and installation for our 6 bed/6 bath rental property. Joe and team exceeded expectations!",
    date: "3 years ago",
    location: "Orlando, FL"
  },
  {
    id: "9",
    clientName: "Richard Clayton",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocIwJdPQCu2lTYrkiUhcObCq1lB7g1QPNJPMBDQuamJHEewmxg=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "Joe and Laura were most helpful with the daunting task of furnishing our vacation property. They removed all the stress and kept us in the loop along the way.",
    date: "a year ago",
    location: "Vacation Property"
  },
  {
    id: "10",
    clientName: "Steve K.",
    clientPhoto: "https://lh3.googleusercontent.com/a/ACg8ocImCXZPU6J9egLTbMhRydlZSuMNjsUzkKWzvVUT_RA-kyjrXw=w600-h600-p-rp-mo-br100",
    rating: 5,
    reviewText: "All inclusive top to bottom refurnishing! Included furniture, carpets, wall hangings, art, housewares, small appliances, electronics, game room and patio furniture!",
    date: "a month ago",
    location: "Orlando, FL"
  }
];

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    index < rating ? '★' : '☆'
  )).join('');
};

export const getAverageRating = () => {
  if (googleReviews.length === 0) return 0;
  const sum = googleReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / googleReviews.length).toFixed(1);
};

export const getTotalReviews = () => googleReviews.length;

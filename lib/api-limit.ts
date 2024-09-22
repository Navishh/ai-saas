import { MAX_FREE_COUNTS } from "@/constants";
import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId: userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

// import UseAuth from "@clerk/nextjs";
// import prismadb from "./prismadb";
// // Import useAuth

// export const increaseApiLimit = async () => {
//   const { userId } = UseAuth(); // Get userId from useAuth hook

//   if (!userId) {
//     return;
//   }

//   const userApiLimit = await prismadb.userApiLimit.findUnique({
//     where: {
//       userId,
//     },
//   });

//   if (userApiLimit) {
//     await prismadb.userApiLimit.update({
//       where: {
//         userId: userId,
//       },
//       data: {
//         count: userApiLimit.count + 1,
//       },
//     });
//   } else {
//     await prismadb.userApiLimit.create({
//       data: { userId: userId, count: 1 },
//     });
//   }
// };

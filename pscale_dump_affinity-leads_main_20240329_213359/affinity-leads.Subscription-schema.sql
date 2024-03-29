CREATE TABLE `Subscription` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripeCustomerId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripeSubscriptionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripeCurrentPeriodEnd` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Subscription_userId_key` (`userId`),
  UNIQUE KEY `Subscription_stripeCustomerId_key` (`stripeCustomerId`),
  UNIQUE KEY `Subscription_stripeSubscriptionId_key` (`stripeSubscriptionId`),
  KEY `Subscription_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

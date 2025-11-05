import { prisma } from "@/server/lib/prisma";

const user = [
    {
        name: "Bip",
        email: "wibu@bip.com",
        password: "Production_123",
    }
];

; (async () => {
    for (const u of user) {
        await prisma.user.upsert({
            where: { email: u.email },
            create: u,
            update: u,
        })

        console.log(`✅ User ${u.email} seeded successfully`)
    }


})().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(() => {
    console.log("✅ Seeding completed successfully ")
    process.exit(0)
})


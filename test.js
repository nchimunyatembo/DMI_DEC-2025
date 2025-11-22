const bcrypt = require('bcryptjs');

async function testBcrypt() {
    try {
        console.log('Testing bcrypt...');
        const hashedPassword = await bcrypt.hash('test123', 10);
        console.log('Hash successful:', hashedPassword);
    } catch(error) {
        console.log('Hash error:', error);
    }
}

testBcrypt();

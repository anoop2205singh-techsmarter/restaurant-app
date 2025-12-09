const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Dummy Data
const menuItems = [
    // Pizza
    {
        id: 1,
        name: 'Rustic Wood-Fired Pizza',
        description: 'Hand-tossed dough, san marzano tomatoes, fresh mozzarella, and basil.',
        price: '$18',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pizza',
        isVegetarian: true,
        isChefSpecial: true
    },
    {
        id: 101,
        name: 'Diavola Spicy',
        description: 'Spicy salami, chili oil, black olives, and mozzarella.',
        price: '$20',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pizza',
        isVegetarian: false,
        isChefSpecial: false
    },
    {
        id: 102,
        name: 'Truffle Mushroom',
        description: 'White base with truffle cream, porcini mushrooms, and thyme.',
        price: '$23',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pizza',
        isVegetarian: true,
        isChefSpecial: false
    },

    // Pasta
    {
        id: 2,
        name: 'Homemade Pappardelle',
        description: 'Wide ribbon pasta with slow-cooked wild boar ragu.',
        price: '$24',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pasta',
        isVegetarian: false,
        isChefSpecial: true
    },
    {
        id: 5,
        name: 'Risotto ai Funghi',
        description: 'Creamy carnaroli rice with wild mushrooms and truffle oil.',
        price: '$22',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pasta',
        isVegetarian: true,
        isChefSpecial: false
    },
    {
        id: 201,
        name: 'Seafood Linguine',
        description: 'Fresh clams, mussels, and shrimp in a white wine sauce.',
        price: '$26',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pasta',
        isVegetarian: false,
        isChefSpecial: false
    },

    // Main
    {
        id: 6,
        name: 'Grilled Branzino',
        description: 'Mediterranean sea bass served with roasted vegetables.',
        price: '$28',
        image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Main',
        isVegetarian: false,
        isChefSpecial: false
    },
    {
        id: 301,
        name: 'Osso Buco',
        description: 'Braised veal shanks cooked with vegetables and white wine broth.',
        price: '$34',
        image: 'https://images.unsplash.com/photo-1544510808-91bcbee1df55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Main',
        isVegetarian: false,
        isChefSpecial: true
    },

    // Starters
    {
        id: 4,
        name: 'Caprese Salad',
        description: 'Fresh tomatoes, mozzarella, basil, and balsamic glaze.',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1529325703135-43a04097d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Starters',
        isVegetarian: true,
        isChefSpecial: false
    },
    {
        id: 401,
        name: 'Arancini Balls',
        description: 'Fried risotto balls stuffed with ragu and peas.',
        price: '$12',
        image: 'https://images.unsplash.com/photo-1548196658-8e69ea6e4926?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Starters',
        isVegetarian: false,
        isChefSpecial: false
    },

    // Dessert
    {
        id: 3,
        name: 'Tiramisu Della Nonna',
        description: 'Classic recipe with espresso-soaked ladyfingers and mascarpone cream.',
        price: '$12',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dessert',
        isVegetarian: true,
        isChefSpecial: true
    },
    {
        id: 7,
        name: 'Pannacotta',
        description: 'Vanilla bean pannacotta with berry coulis.',
        price: '$10',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a029177b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dessert',
        isVegetarian: true,
        isChefSpecial: false
    },

    // Cocktails
    {
        id: 501,
        name: 'Aperol Spritz',
        description: 'Prosecco, Aperol, and soda water. The classic Italian aperitivo.',
        price: '$12',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Cocktails',
        isVegetarian: true,
        isChefSpecial: false
    },
    {
        id: 502,
        name: 'Negroni',
        description: 'Gin, Campari, and Sweet Vermouth with an orange peel.',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Placeholder
        category: 'Cocktails',
        isVegetarian: true,
        isChefSpecial: true
    }
];

// REST API
app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

// Update price endpoint to demonstrate real-time
app.post('/api/update-price/:id', (req, res) => {
    const { id } = req.params;
    const { price } = req.body;

    const item = menuItems.find(i => i.id == id);
    if (item) {
        item.price = price;
        // Emit event to all connected clients
        io.emit('menu_updated', menuItems);
        res.json({ success: true, item });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function VoiceOrdering() {
  const { apiCall } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceCommands, setVoiceCommands] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [cart, setCart] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const languages = [
    { code: 'en-IN', name: 'English (India)', flag: '🇮🇳' },
    { code: 'hi-IN', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'bn-IN', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'தம��ழ் (Tamil)', flag: '🇮🇳' },
    { code: 'te-IN', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'mr-IN', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'gu-IN', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' }
  ];

  const voiceCommands_en = [
    "Add 5 kg onions to cart",
    "Show me tomatoes",
    "What's the price of rice?",
    "Remove onions from cart",
    "Place order",
    "Show my cart",
    "Find organic vegetables",
    "Search for spices"
  ];

  const voiceCommands_hi = [
    "कार्ट में 5 किलो प्याज जोड़ें",
    "मुझे टमाटर दिखाएं",
    "चावल की कीमत क्या है?",
    "कार्ट से प्याज हटाएं",
    "ऑर्डर दें",
    "मेरा कार्ट दिखाएं",
    "जैविक सब्जियां खोजें",
    "मसाले खोजें"
  ];

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = selectedLanguage;

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Set voice commands based on language
    if (selectedLanguage.startsWith('hi')) {
      setVoiceCommands(voiceCommands_hi);
    } else {
      setVoiceCommands(voiceCommands_en);
    }
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.lang = selectedLanguage;
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    
    // English commands
    if (lowerCommand.includes('add') && lowerCommand.includes('cart')) {
      const match = lowerCommand.match(/add (\d+) ?(kg|kilogram|kilo)? ?(.+?) to cart/);
      if (match) {
        const quantity = parseInt(match[1]);
        const item = match[3];
        addToCartVoice(item, quantity);
      }
    } else if (lowerCommand.includes('show') && lowerCommand.includes('cart')) {
      showCart();
    } else if (lowerCommand.includes('show me') || lowerCommand.includes('show')) {
      // Handle "Show me [product]" commands
      const showMatch = lowerCommand.match(/show (?:me )?(.+)/);
      if (showMatch && !showMatch[1].includes('cart')) {
        const product = showMatch[1].trim();
        searchAndDisplayProducts(product);
      }
    } else if (lowerCommand.includes('place order')) {
      placeOrderVoice();
    } else if (lowerCommand.includes('remove') && lowerCommand.includes('cart')) {
      const match = lowerCommand.match(/remove (.+?) from cart/);
      if (match) {
        removeFromCartVoice(match[1]);
      }
    } else if (lowerCommand.includes('search') || lowerCommand.includes('find')) {
      const match = lowerCommand.match(/(?:search|find) (?:for )?(.+)/);
      if (match) {
        searchAndDisplayProducts(match[1]);
      }
    } else if (lowerCommand.includes('price') || lowerCommand.includes('cost')) {
      // Handle price queries like "What's the price of rice?"
      const priceMatch = lowerCommand.match(/(?:price|cost) (?:of )?(.+)/);
      if (priceMatch) {
        getProductPrice(priceMatch[1]);
      }
    }
    
    // Hindi commands (basic pattern matching)
    else if (lowerCommand.includes('जोड़ें') || lowerCommand.includes('add')) {
      // Handle Hindi add commands
      speakResponse("आपका आइटम कार्ट में जोड़ दिया गया है", "Item added to cart");
    } else if (lowerCommand.includes('दिखाएं') || lowerCommand.includes('show')) {
      const hindiShowMatch = lowerCommand.match(/(?:दिखाएं|show) (?:मुझे )?(.+)/);
      if (hindiShowMatch && !hindiShowMatch[1].includes('कार्ट')) {
        const product = hindiShowMatch[1].trim();
        searchAndDisplayProducts(product);
      } else {
        speakResponse("यहाँ आपका कार्ट है", "Here is your cart");
      }
    }
  };

  const addToCartVoice = (item, quantity) => {
    const newItem = {
      id: Date.now(),
      name: item,
      quantity: quantity,
      price: Math.floor(Math.random() * 100) + 20 // Mock price
    };
    setCart([...cart, newItem]);
    speakResponse(`Added ${quantity} ${item} to cart`, `कार्ट में ${quantity} ${item} जोड़ा गया`);
  };

  const removeFromCartVoice = (item) => {
    setCart(cart.filter(cartItem => !cartItem.name.toLowerCase().includes(item)));
    speakResponse(`Removed ${item} from cart`, `कार्ट से ${item} हटा दिया गया`);
  };

  const showCart = () => {
    if (cart.length === 0) {
      speakResponse("Your cart is empty", "आपका कार्ट खाली है");
    } else {
      const itemCount = cart.length;
      speakResponse(`You have ${itemCount} items in your cart`, `आपके कार्ट में ${itemCount} आइटम ���ैं`);
    }
  };

  const placeOrderVoice = () => {
    if (cart.length > 0) {
      speakResponse("Order placed successfully", "ऑर्डर सफलतापूर्वक दिया गया");
      setCart([]);
    } else {
      speakResponse("Your cart is empty. Please add items first", "आपका कार्ट खाली है। पहले आइटम जोड़ें");
    }
  };

  const searchProducts = (query) => {
    speakResponse(`Searching for ${query}`, `${query} खोजा जा रहा है`);
  };

  const searchAndDisplayProducts = async (query) => {
    try {
      // Mock product data - in a real app, this would be an API call
      const mockProducts = [
        { id: 1, name: 'Fresh Tomatoes', price: 30, unit: 'kg', stock: 300, description: 'Fresh red tomatoes, perfect for cooking', image: '🍅' },
        { id: 2, name: 'Cherry Tomatoes', price: 80, unit: 'kg', stock: 50, description: 'Sweet cherry tomatoes', image: '🍅' },
        { id: 3, name: 'Organic Tomatoes', price: 45, unit: 'kg', stock: 150, description: 'Organic red tomatoes', image: '🍅' },
        { id: 4, name: 'Fresh Onions', price: 25, unit: 'kg', stock: 500, description: 'Premium red onions from Punjab farms', image: '🧅' },
        { id: 5, name: 'Basmati Rice', price: 120, unit: 'kg', stock: 200, description: 'Premium basmati rice', image: '🌾' },
        { id: 6, name: 'Green Chilies', price: 80, unit: 'kg', stock: 50, description: 'Fresh green chilies with perfect heat level', image: '🌶️' },
        { id: 7, name: 'Organic Vegetables', price: 60, unit: 'kg', stock: 100, description: 'Mixed organic vegetables', image: '🥬' },
        { id: 8, name: 'Spice Mix', price: 150, unit: 'kg', stock: 75, description: 'Traditional Indian spice mix', image: '🌶️' }
      ];

      // Filter products based on query
      const filteredProducts = mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredProducts);
      setShowSearchResults(true);

      if (filteredProducts.length > 0) {
        const resultCount = filteredProducts.length;
        const firstProduct = filteredProducts[0];
        speakResponse(
          `Found ${resultCount} results for ${query}. First result: ${firstProduct.name} at ₹${firstProduct.price} per ${firstProduct.unit}`,
          `${query} के लिए ${resultCount} परिणाम मिले। पहला परिणाम: ${firstProduct.name} ₹${firstProduct.price} प्रति ${firstProduct.unit}`
        );
      } else {
        speakResponse(
          `No products found for ${query}. Try searching for tomatoes, onions, rice, or spices`,
          `${query} के लिए कोई उत्पाद नहीं मिला। टमाटर, प्याज, चावल, या मसाले खोजने का प्रयास करें`
        );
      }
    } catch (error) {
      console.error('Error searching products:', error);
      speakResponse(
        `Sorry, there was an error searching for ${query}`,
        `खुशी है, ${query} खोजने में त्रुटि हुई`
      );
    }
  };

  const getProductPrice = (productName) => {
    // Mock price data
    const priceData = {
      'tomatoes': { price: 30, unit: 'kg' },
      'tomato': { price: 30, unit: 'kg' },
      'onions': { price: 25, unit: 'kg' },
      'onion': { price: 25, unit: 'kg' },
      'rice': { price: 120, unit: 'kg' },
      'chilies': { price: 80, unit: 'kg' },
      'chili': { price: 80, unit: 'kg' },
      'spices': { price: 150, unit: 'kg' },
      'spice': { price: 150, unit: 'kg' }
    };

    const product = productName.toLowerCase().trim();
    const priceInfo = priceData[product];

    if (priceInfo) {
      speakResponse(
        `The price of ${productName} is ₹${priceInfo.price} per ${priceInfo.unit}`,
        `${productName} की कीमत ₹${priceInfo.price} प्रति ${priceInfo.unit} है`
      );
    } else {
      speakResponse(
        `Sorry, I don't have price information for ${productName}. Try asking about tomatoes, onions, rice, or spices`,
        `खुशी है, मेरे पास ${productName} की कीमत की जानकारी नहीं है। टमाटर, प्याज, चावल, या मसाले के बारे में पूछने का प्रयास करें`
      );
    }
  };

  const addProductToCart = (product, quantity = 1) => {
    const newItem = {
      id: Date.now(),
      name: product.name,
      quantity: quantity,
      price: product.price
    };
    setCart([...cart, newItem]);
    speakResponse(
      `Added ${quantity} kg of ${product.name} to cart at ₹${product.price} per kg`,
      `कार्ट में ${quantity} किलो ${product.name} ₹${product.price} प्रति किलो की दर से जोड़ा गया`
    );
  };

  const speakResponse = (englishText, hindiText) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = selectedLanguage.startsWith('hi') ? hindiText : englishText;
      utterance.lang = selectedLanguage;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const executeCommand = (command) => {
    setTranscript(command);
    processVoiceCommand(command);
  };

  if (!isSupported) {
    return (
      <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <div className="card">
          <h2>🎤 Voice Ordering Not Supported</h2>
          <p>Your browser doesn't support speech recognition. Please use a modern browser like Chrome or Edge.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🎤 Voice Ordering System
        </h1>
        <p style={{ color: '#666' }}>
          Order ingredients using voice commands in your preferred language
        </p>
      </div>

      {/* Language Selection */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🌐 Select Language
          </h3>
        </div>
        <div className="row">
          {languages.map(lang => (
            <div key={lang.code} className="col-4">
              <button
                className={`btn ${selectedLanguage === lang.code ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%', marginBottom: '0.5rem' }}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                {lang.flag} {lang.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Control Panel */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎙️ Voice Control
          </h3>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            background: isListening ? 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: isListening ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isListening ? '0 0 30px rgba(220, 53, 69, 0.5)' : '0 0 20px rgba(40, 167, 69, 0.3)'
          }}
          onClick={isListening ? stopListening : startListening}
          >
            <div style={{ fontSize: '3rem', color: 'white' }}>
              {isListening ? '🔴' : '🎤'}
            </div>
          </div>
          
          <h3 style={{ marginBottom: '1rem' }}>
            {isListening ? 'Listening...' : 'Tap to Start Voice Ordering'}
          </h3>
          
          {transcript && (
            <div style={{ 
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '2px solid #e9ecef'
            }}>
              <h4 style={{ marginBottom: '0.5rem' }}>You said:</h4>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#333' }}>
                "{transcript}"
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={startListening}
              disabled={isListening}
            >
              🎤 Start Listening
            </button>
            <button 
              className="btn btn-secondary"
              onClick={stopListening}
              disabled={!isListening}
            >
              ⏹️ Stop Listening
            </button>
          </div>
        </div>
      </div>

      {/* Sample Voice Commands */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💬 Sample Voice Commands
          </h3>
        </div>
        <div className="row">
          {voiceCommands.map((command, index) => (
            <div key={index} className="col-2">
              <div 
                style={{ 
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => executeCommand(command)}
                onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
                onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  🗣️
                </div>
                <p style={{ fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>
                  "{command}"
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Click on any command to try it out, or speak naturally!
          </p>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔍 Search Results ({searchResults.length} found)
            </h3>
            <button 
              className="btn btn-outline btn-small"
              onClick={() => setShowSearchResults(false)}
              style={{ marginLeft: 'auto' }}
            >
              ✕ Close
            </button>
          </div>
          <div className="row">
            {searchResults.map(product => (
              <div key={product.id} className="col-3">
                <div style={{ 
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: '2px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                    {product.image}
                  </div>
                  <h4 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{product.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem', textAlign: 'center' }}>
                    {product.description}
                  </p>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#28a745' }}>
                      ₹{product.price} per {product.unit}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      Stock: {product.stock} {product.unit}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => addProductToCart(product, 1)}
                    >
                      Add 1kg
                    </button>
                    <button 
                      className="btn btn-outline btn-small"
                      onClick={() => addProductToCart(product, 5)}
                    >
                      Add 5kg
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Cart */}
      {cart.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛒 Voice Cart ({cart.length} items)
            </h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity} kg</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => removeFromCartVoice(item.name)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'right', padding: '1rem' }}>
            <h4>Total: ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</h4>
            <button 
              className="btn btn-success"
              onClick={placeOrderVoice}
              style={{ marginTop: '1rem' }}
            >
              🛒 Place Order via Voice
            </button>
          </div>
        </div>
      )}

      {/* Voice Features */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ✨ Voice Features
          </h3>
        </div>
        <div className="row">
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌍</div>
              <h4>Multi-Language</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Support for 8+ Indian languages including Hindi, Bengali, Tamil, and more
              </p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
              <h4>Smart Recognition</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                AI-powered speech recognition that understands natural language commands
              </p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
              <h4>Instant Response</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Real-time voice feedback and confirmation in your selected language
              </p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
              <h4>Hands-Free</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Perfect for busy vendors who need to order while working
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceOrdering;